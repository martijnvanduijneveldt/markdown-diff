import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('Table', () => {
  it('Should work for table', () => {
    const oldStr = '|a|b|\n|-|-|\n|c|d|';
    const newStr = '|1|b|\n|-|-|\n|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '|<del>a</del><ins>1</ins>|b|\n|-|-|\n|c|d|');
  });

  it('Column add should work', () => {
    const oldStr = '|a|\n|-|\n|c|';
    const newStr = '|a|b|\n|-|-|\n|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '|a|<ins>b</ins>|\n|-|-|\n|c|<ins>d</ins>|');
  });

  it('Multi column add should work', () => {
    const oldStr = '|a|\n|-|\n|c|';
    const newStr = '|1|2|a|b|\n|-|-|-|-|\n|3|4|c|d|';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, `|<del>a</del><ins>1</ins>|<ins>2</ins>|<ins>a</ins>|<ins>b</ins>|
|-|-|-|-|
|<del>c</del><ins>3</ins>|<ins>4</ins>|<ins>c</ins>|<ins>d</ins>|`);
  });
  describe('Cell alignment', () => {
    it('left = no difference', () => {
      const oldStr = '|a|b|\n|-|-|\n|c|d|';
      const newStr = '|a|b|\n|-|-|\n|c|d|';
      const diff = markdownDiff(oldStr, newStr);
      assert.equal(diff, '|a|b|\n|-|-|\n|c|d|');
    });
    describe('center', () => {
      it('add', () => {
        const oldStr = '|a|b|\n|-|-|\n|c|d|';
        const newStr = '|a|b|\n|-|:-:|\n|c|d|';
        const diff = markdownDiff(oldStr, newStr);
        assert.equal(diff, '|a|b|\n|-|:-:|\n|c|d|');
      });
      it('remove', () => {
        const oldStr = '|a|b|\n|-|:-:|\n|c|d|';
        const newStr = '|a|b|\n|-|-|\n|c|d|';
        const diff = markdownDiff(oldStr, newStr);
        assert.equal(diff, '|a|b|\n|-|-|\n|c|d|');
      });
    });
    it('right', () => {
      it('add', () => {
        const oldStr = '|a|b|\n|-|-|\n|c|d|';
        const newStr = '|a|b|\n|-|-:|\n|c|d|';
        const diff = markdownDiff(oldStr, newStr);
        assert.equal(diff, '|a|b|\n|-|-:|\n|c|d|');
      });
      it('remove', () => {
        const oldStr = '|a|b|\n|-|-:|\n|c|d|';
        const newStr = '|a|b|\n|-|-|\n|c|d|';
        const diff = markdownDiff(oldStr, newStr);
        assert.equal(diff, '|a|b|\n|-|-|\n|c|d|');
      });
    });
  });
});
