import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('Emphasis text', () => {
  describe('Bold text', () => {
    it('Simple edit', () => {
      const oldStr = 'aa *bb cc* zz';
      const newStr = 'aa *bb dd* zz';
      const diff = markdownDiff(oldStr, newStr);
      assert.equal(diff, 'aa *bb <del>cc</del><ins>dd</ins>* zz');
    });
  });

  describe('Italic text', () => {
    it('Simple edit', () => {
      const oldStr = 'aa *bb cc* zz';
      const newStr = 'aa *bb dd* zz';
      const diff = markdownDiff(oldStr, newStr);
      assert.equal(diff, 'aa *bb <del>cc</del><ins>dd</ins>* zz');
    });
  });
  describe('Bold italic text', () => {
    it('Simple edit', () => {
      const oldStr = 'aa ***bb cc*** zz';
      const newStr = 'aa ***bb dd*** zz';
      const diff = markdownDiff(oldStr, newStr);
      assert.equal(diff, 'aa ***bb <del>cc</del><ins>dd</ins>*** zz');
    });
  });

});
