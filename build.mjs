// Build the SHRINK data URI from min.html.
// Usage: node build.mjs   -> writes uri.txt, prints byte count, fails above LIMIT.
import { readFileSync, writeFileSync } from 'node:fs';

const LIMIT = 2900;
const src = readFileSync(new URL('min.html', import.meta.url), 'utf8').trim();

if (/[\n\r]/.test(src)) throw new Error('min.html must be a single line');
if (/[^\x20-\x7e]/.test(src)) throw new Error('min.html must be printable ASCII');

// Encode only what breaks a pasted data: URL. % must go first.
const uri = 'data:text/html,' + src
  .replace(/%/g, '%25')
  .replace(/ /g, '%20')
  .replace(/#/g, '%23');

writeFileSync(new URL('uri.txt', import.meta.url), uri);
const bytes = Buffer.byteLength(uri);
console.log(`${bytes} bytes (limit ${LIMIT}, ${LIMIT - bytes} spare)`);
if (bytes > LIMIT) process.exit(1);
