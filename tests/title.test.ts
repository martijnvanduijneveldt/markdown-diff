import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('Title', () => {
  it('with single #', () => {
    const oldStr = '# ele one\n# ele two';
    const newStr = '# ele one\n# ele two\n# ele three';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '# ele one\n# ele two\n# <ins>ele three</ins>');
  })
  it('With multilple ##', () => {
    const oldStr = '## ele one\n## ele two';
    const newStr = '## ele one\n## ele two\n## ele three\n## ele four';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '## ele one\n## ele two\n## <ins>ele three</ins>\n## <ins>ele four</ins>');
  })
})