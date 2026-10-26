import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {validateDictionary} from './check-ui-dictionary.mjs';
const dictionary=JSON.parse(readFileSync(new URL('../docs/ui-dictionary.json',import.meta.url),'utf8'));
test('rejects duplicate stable dictionary IDs',()=>{
  const data=structuredClone(dictionary);
  data.entries.push(data.entries[0]);
  assert.throws(()=>validateDictionary(data),/Duplicate/);
});
test('rejects an advertised component without a public API',()=>{
  const data=structuredClone(dictionary);
  data.entries[0].subpath='nonexistent-control';
  assert.throws(()=>validateDictionary(data),/export/);
});
test('rejects a shipped public component missing from the dictionary',()=>{
  const data=structuredClone(dictionary);
  data.entries=data.entries.filter(entry=>entry.component!=='Button');
  assert.throws(()=>validateDictionary(data),/Button/);
});
