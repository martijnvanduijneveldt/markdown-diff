import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('Text', () => {
  it('Single line', () => {
    const oldStr = 'This is a single line';
    const newStr = 'This is a single new line';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('This is a single <ins>new </ins>line');
  });
  it('Single line - delete insert', () => {
    const oldStr = 'Simple sentence and delete';
    const newStr = 'Simple sentence with insert and';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('Simple sentence <ins>with insert </ins>and<del> delete</del>');
  });
});
