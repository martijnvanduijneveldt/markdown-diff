import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('Heading', () => {
  it('with single #', () => {
    const oldStr = '# ele one\n# ele two';
    const newStr = '# ele one\n# ele two\n# ele three';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('# ele one\n# ele two\n# <ins>ele three</ins>');
  });
  it('With multilple ##', () => {
    const oldStr = '## ele one\n## ele two';
    const newStr = '## ele one\n## ele two\n## ele three\n## ele four';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('## ele one\n## ele two\n## <ins>ele three</ins>\n## <ins>ele four</ins>');
  });
  it('Should work correcly with text and title', () => {
    const oldStr = 'text1\n## title 1 x\ntext2';
    const newStr = 'text1\n## title 2 x\ntext2';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('text1\n## title <del>1</del><ins>2</ins> x\ntext2');
  });
});
