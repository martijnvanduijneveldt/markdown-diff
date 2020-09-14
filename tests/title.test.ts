import { assert } from 'chai';
import { markdownDiff } from '../src';

describe('Heading', () => {
  it('with single #', () => {
    const oldStr = '# ele one\n# ele two';
    const newStr = '# ele one\n# ele two\n# ele three';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '# ele one\n# ele two\n# <ins>ele three</ins>\n');
  });
  it('With multilple ##', () => {
    const oldStr = '## ele one\n## ele two';
    const newStr = '## ele one\n## ele two\n## ele three\n## ele four';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '## ele one\n## ele two\n## <ins>ele three</ins>\n## <ins>ele four</ins>\n');
  });
});
