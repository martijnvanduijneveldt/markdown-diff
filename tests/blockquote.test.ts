import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('BlockQuote', () => {
  it('Simple line add', () => {
    const oldStr = '> First line';
    const newStr = '> First line\n>\n> Second line';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '> First line\n> <ins></ins>\n> <ins>Second line</ins>');
  });
  it('Simple line remove', () => {
    const oldStr = '> First line\n>\n> Second line';
    const newStr = '> First line';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '> First line\n> <del></del>\n> <del>Second line</del>');
  });
  // it('Nested block', () => {
  //   const oldStr = '> First line';
  //   const newStr = '> First line\n>> Nested line';
  //   const diff = markdownDiff(oldStr, newStr);
  //   assert.equal(diff, '> First line\n> <del></del>\n> <del>Second line</del>');
  // });
});
