import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('List', () => {
  it('List should work correctly', () => {
    const oldStr = '- ele one\n- ele two';
    const newStr = '- ele one\n- ele two\n- ele three';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('* ele one\n* ele two\n* <ins>ele three</ins>');
  });
  it('List should work correctly - with numbers', () => {
    const oldStr = '1. ele one\n2. ele two';
    const newStr = '1. ele one\n2. ele two\n3. ele three';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('1. ele one\n2. ele two\n3. <ins>ele three</ins>');
  });
  it('List should work correctly - multiple add', () => {
    const oldStr = '* ele one\n* ele two';
    const newStr = '* ele one\n* ele two\n* ele three\n* ele four';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('* ele one\n* ele two\n* <ins>ele three</ins>\n* <ins>ele four</ins>');
  });
});
