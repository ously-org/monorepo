export default async function (context) {
  // Run formatting and linting fixes after session completes
  const { execSync } = require('child_process');
  console.log('Running format and lint fixes via Gemini Hook...');
  try {
    execSync('pnpm run format', { stdio: 'inherit', cwd: context.projectDir });
    execSync('pnpm run lint:fix', { stdio: 'inherit', cwd: context.projectDir });
    console.log('Auto-fixes completed successfully.');
  } catch (err) {
    console.error('Auto-fixes failed:', err.message);
  }
}
