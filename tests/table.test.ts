import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('List', () => {
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
});