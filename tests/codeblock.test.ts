import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('CodeBlock', () => {
  it('Simple line remove add', () => {
    const oldStr = '```\na\nb\nc\n```';
    const newStr = '```\na\nb\nd\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\n  a\n  b\n- c\n+ d\n```';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal(expected);
  });
  it('Simple line add', () => {
    const oldStr = '```\na\nb\n```';
    const newStr = '```\na\nb\nc\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\n  a\n  b\n+ c\n```';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal(expected);
  });
  it('Multiple line add', () => {
    const oldStr = '```\na\nb\n```';
    const newStr = '```\na\nd\nb\nc\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\n  a\n+ d\n  b\n+ c\n```';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal(expected);
  });
  it('No diff', () => {
    const oldStr = '```\na\nb\n```';
    const newStr = '```\na\nb\n```';
    // tslint:disable-next-line:prefer-template
    const expected = '```\na\nb\n```';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal(expected);
  });
});
