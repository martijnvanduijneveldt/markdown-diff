import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('Code span', () => {
  it('Simple edit', () => {
    const oldStr = 'aa `bb cc` zz';
    const newStr = 'aa `bb dd` zz';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('aa <del>`bb cc`</del><ins>`bb dd`</ins> zz');
  });
  it('Simple add', () => {
    const oldStr = 'aa';
    const newStr = 'aa `bb dd`';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('aa <ins>`bb dd`</ins>');
  });

  it('Simple remove', () => {
    const oldStr = 'aa `bb dd`';
    const newStr = 'aa';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('aa <del>`bb dd`</del>');
  });
  it('No change', () => {
    const oldStr = 'aa `bb dd`';
    const newStr = 'aa `bb dd`';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('aa `bb dd`');
  });
});
