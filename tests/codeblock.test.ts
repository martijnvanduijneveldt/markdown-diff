import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('CodeBlock', () => {
  it('Simple line remove add', () => {
    const oldStr = '```\na\nb\nc\n```';
    const newStr = '```\na\nb\nd\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\na\nb\n- c\n+ d\n```';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, expected);
  });
  it('Simple line add', () => {
    const oldStr = '```\na\nb\n```';
    const newStr = '```\na\nb\nc\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\na\nb\n+ c\n```';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, expected);
  });
  it('Multiple line add', () => {
    const oldStr = '```\na\nb\n```';
    const newStr = '```\na\nd\nb\nc\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\na\n+ d\nb\n+ c\n```';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, expected);
  });
});
