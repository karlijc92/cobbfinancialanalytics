// supabaseClient.js
// Initializes the Supabase client used by intake.html to save submissions
// and upload files to the intake-files storage bucket.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://vswytkyeltrtjxyrjmtm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iiMU816gO2sQwOdODoFS4A_OdxqbCR1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
