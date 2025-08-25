// Auto-migration script to handle database migrations without prompts
const { exec } = require('child_process');
const { spawn } = require('child_process');

console.log('Starting auto-migration process...');

// Set environment variable to auto-accept migrations
process.env.PAYLOAD_CONFIG_PATH = './payload.config.ts';
process.env.SKIP_MIGRATE_PROMPT = 'true';
process.env.PAYLOAD_MIGRATE_AUTO_ACCEPT = 'true';

// Start the Next.js dev server
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PAYLOAD_MIGRATE_AUTO_ACCEPT: 'true',
    CI: 'true' // This often bypasses prompts
  }
});

nextProcess.on('error', (err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`Process exited with code ${code}`);
  process.exit(code);
});