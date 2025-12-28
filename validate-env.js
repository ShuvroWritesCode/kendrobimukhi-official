const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  let urlValues = [];
  let keyDefined = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim();
    
    if (key.trim() === 'NEXT_PUBLIC_SUPABASE_URL') {
      urlValues.push(value);
    }
    if (key.trim() === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
      if (value.length > 10) keyDefined = true;
    }
  });

  console.log('--- Env Validation ---');
  if (urlValues.length === 0) {
    console.log('ERROR: NEXT_PUBLIC_SUPABASE_URL is not defined.');
  } else {
    urlValues.forEach(val => {
       if (!val.startsWith('https://')) {
         console.log('ERROR: NEXT_PUBLIC_SUPABASE_URL should start with https://. Found value starting with: ' + val.substring(0, 10) + '...');
       } else {
         console.log('SUCCESS: NEXT_PUBLIC_SUPABASE_URL looks valid (starts with https://)');
       }
    });
  }

  if (keyDefined) {
    console.log('SUCCESS: NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be defined.');
  } else {
    console.log('ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or too short.');
  }

} catch (err) {
  console.error('Failed to read .env.local:', err.message);
}
