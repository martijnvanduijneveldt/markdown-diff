
import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('Bold text', () => {
  it('Simple edit', () => {
    const oldStr = 'aa `bb cc` zz';
    const newStr = 'aa `bb dd` zz';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'aa <del>`bb cc`</del><ins>`bb dd`</ins> zz');
  });
  it('Simple add', () => {
    const oldStr = 'aa';
    const newStr = 'aa `bb dd`';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'aa <ins>`bb dd`</ins>');
  });

  it('Simple remove', () => {
    const oldStr = 'aa `bb dd`';
    const newStr = 'aa';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'aa <del>`bb dd`</del>');
  });
});
