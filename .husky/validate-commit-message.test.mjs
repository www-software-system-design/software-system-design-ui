import {strict as assert} from 'node:assert';
import {test} from 'node:test';
import {isValidCommitSubject} from './validate-commit-message.mjs';

test('accepts each supported type and action with a three-digit SSD ID', () => {
  for (const type of ['feat','fix']) {
    for (const action of ['add','update','resolve','remove','cleanup']) {
      assert.equal(isValidCommitSubject(type+'(SSD-123): '+action+' reusable components'), true);
    }
  }
  assert.equal(isValidCommitSubject('feat(SSD-000): add commit message validation'), true);
});
test('rejects other types, missing IDs and malformed IDs', () => {
  for (const value of ['chore(SSD-123): update tooling','feat: add components','feat(SSD-12): add components','fix(SSD-1234): resolve bug','feat(ssd-123): add components']) {
    assert.equal(isValidCommitSubject(value), false, value);
  }
});
test('requires exact separators, supported action and nonblank summary', () => {
  for (const value of ['feat(SSD-123): build components','feat(SSD-123):update components','feat(SSD-123): update','feat(SSD-123): update   ',' feat(SSD-123): update components','feat(SSD-123): update components\nextra subject']) {
    assert.equal(isValidCommitSubject(value), false, value);
  }
});
