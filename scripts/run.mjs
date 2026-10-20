import { spawnSync } from 'node:child_process';

// Invoke npm's JS entry point directly: portable across Windows and Unix without a shell.
export function npm(args, options = {}) {
  const cli = process.env.npm_execpath;
  if (!cli) throw new Error('Run this script through npm run so npm_execpath is available.');
  return run(process.execPath, [cli, ...args], options);
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}`);
  return result.stdout;
}
