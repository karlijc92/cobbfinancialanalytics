import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    const record = payload.record || {};

    const fieldRows = Object.entries(record)
      .map(([key, value]) => `<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">${key}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${value}</td></tr>`)
      .join('');

    const { data, error } = await resend.emails.send({
      from: 'Cobb Financial Analytics <notifications@cobbfinancialanalytics.com>',
      to: ['cobbfinancialanalytics@proton.me'],
      subject: `New Intake Submission: ${record.package_name || 'Unknown Package'}`,
      html: `
        <h2>New Intake Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          ${fieldRows}
        </table>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
