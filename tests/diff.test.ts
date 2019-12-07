import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('markdownDiff', () => {
  it('Single line', () => {
    const oldStr = 'This is a single line';
    const newStr = 'This is a single new line';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'This is a single <ins>new </ins>line');
  });
  it('Single line - delete insert', () => {
    const oldStr = 'Simple sentence and delete';
    const newStr = 'Simple sentence with insert and';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'Simple sentence <ins>with insert </ins>and<del> delete</del>');
  });

  it('Should work for table',()=>{
    const oldStr = '|a|b|\n|c|d|';
    const newStr = '|1|b|\n|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '|<del>a</del><ins>1</ins>|b|\n|c|d|');
  })

  it('Column add should work',()=>{
    const oldStr = '|a|\n|c|';
    const newStr = '|a|b|\n|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '|a|<ins>b</ins>|\n|c|<ins>d</ins>|');
  })

  it('Multi column add should work',()=>{
    const oldStr = '|a|\n|c|';
    const newStr = '|1|2|a|b|\n|3|4|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '|<ins>1</ins>|<ins>2</ins>|a|<ins>b</ins>|\n|<ins>3</ins>|<ins>4</ins>|c|<ins>d</ins>|');
  })

  it('List should work correctly',()=>{
    const oldStr = '- ele one\n* ele two';
    const newStr = '- ele one\n* ele two\n+ ele three';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '- ele one\n* ele two\n+ <ins>ele three</ins>');
  })
  it('List should work correctly - multiple add',()=>{
    const oldStr = '* ele one\n* ele two';
    const newStr = '* ele one\n* ele two\n* ele three\n* ele four';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '* ele one\n* ele two\n* <ins>ele three</ins>\n* <ins>ele four</ins>');
  })

});
