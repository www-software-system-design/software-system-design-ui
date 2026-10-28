import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const subjectPattern = /^(feat|fix)\(SSD-\d{3}\): (add|update|resolve|remove|cleanup) \S(?:[^\r\n]*\S)?$/;
export function isValidCommitSubject(subject) {
  return subjectPattern.test(subject);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const messageFile = process.argv[2];
  if (!messageFile) {
    console.error('Usage: node .husky/validate-commit-message.mjs <message-file>');
    process.exitCode = 1;
  } else {
    const subject = readFileSync(messageFile, 'utf8').split(/\r?\n/, 1)[0];
    if (!isValidCommitSubject(subject)) {
      console.error('Invalid commit subject. Required: <feat|fix>(SSD-000): <add|update|resolve|remove|cleanup> message');
      console.error('Example: feat(SSD-000): add reusable page components');
      process.exitCode = 1;
    }
  }
}
