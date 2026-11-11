#!/usr/bin/env node

import { spawn } from 'node:child_process';

const steps = [
  { name: 'Vitest Unit Tests', command: 'npx', args: ['vitest', 'run'] },
  { name: 'Design System Validation', command: 'node', args: ['scripts/check-design-system.mjs'] },
  { name: 'ESLint Code Quality', command: 'npx', args: ['eslint', '.'] },
  { name: 'TypeScript Typecheck', command: 'npx', args: ['tsc', '-b'] },
  { name: 'Vite Production Build', command: 'npx', args: ['vite', 'build'] },
];

function runStep(step) {
  return new Promise((resolve, reject) => {
    process.stdout.write(`\x1b[36m⏳ [1/5] Running ${step.name}...\x1b[0m\n`);
    const proc = spawn(step.command, step.args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) {
        process.stdout.write(`\x1b[32m✓ ${step.name} passed.\x1b[0m\n\n`);
        resolve();
      } else {
        process.stderr.write(`\x1b[31m✗ ${step.name} failed with exit code ${code}.\x1b[0m\n\n`);
        reject(new Error(`${step.name} failed`));
      }
    });
    proc.on('error', (err) => {
      process.stderr.write(`\x1b[31m✗ Error executing ${step.name}: ${err.message}\x1b[0m\n`);
      reject(err);
    });
  });
}

async function main() {
  process.stdout.write(`\x1b[1m\x1b[35m=== Pre-Commit Verification Pipeline ===\x1b[0m\n\n`);
  const startTime = Date.now();

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    process.stdout.write(`\x1b[34m[${i + 1}/${steps.length}]\x1b[0m `);
    try {
      await runStep(step);
    } catch {
      process.stderr.write(`\x1b[1m\x1b[31m🚫 Commit blocked: Verification pipeline failed. Fix the issues above before committing.\x1b[0m\n`);
      process.exit(1);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  process.stdout.write(`\x1b[1m\x1b[32m🚀 All pre-commit checks passed cleanly in ${duration}s! Ready to commit.\x1b[0m\n\n`);
}

main();
