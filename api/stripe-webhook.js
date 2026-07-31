// api/stripe-webhook.js
const crypto = require('crypto');

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on('data', (chunk) => chunks.push(chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader) throw new Error('Missing Stripe signature header');

  const parts = sigHeader.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) throw new Error('Invalid Stripe signature header');

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const actualBuffer = Buffer.from(signature, 'hex');

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error('Signature mismatch');
  }

  const tolerance = 300; // 5 min replay protection
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > tolerance) {
    throw new Error('Timestamp outside tolerance');
  }

  return true;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let rawBody;
  try {
    rawBody = (await buffer(req)).toString('utf8');
  } catch (err) {
    res.status(400).send('Could not read request body');
    return;
  }

  try {
    verifyStripeSignature(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    res.status(400).send('Invalid JSON payload');
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const submissionId = session.client_reference_id;

    if (!submissionId) {
      console.error('No client_reference_id on session:', session.id);
      res.status(200).send('No client_reference_id — skipping');
      return;
    }

    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      const updateResponse = await fetch(
        `${supabaseUrl}/rest/v1/submissions?id=eq.${submissionId}`,
        {
          method: 'PATCH',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({ payment_status: 'paid' }),
        }
      );

      if (!updateResponse.ok) {
        const errText = await updateResponse.text();
        console.error('Supabase update failed:', errText);
        res.status(500).send('Failed to update payment status');
        return;
      }
    } catch (err) {
      console.error('Error updating Supabase:', err.message);
      res.status(500).send('Internal error updating payment status');
      return;
    }
  }

  res.status(200).json({ received: true });
};
