import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('Bold text', () => {
  it('Simple edit', () => {
    const oldStr = 'aa **bb cc** zz';
    const newStr = 'aa **bb dd** zz';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'aa **bb <del>cc</del><ins>dd</ins>** zz');
  });
});
