import { it, describe, expect } from 'vitest';
import { markdownDiff } from '../src';

describe('Link', () => {
  it('No diff', () => {
    const oldStr = 'You can even [link to Google!](http://google.com)';
    const newStr = 'You can even [link to Google!](http://google.com)';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('You can even [link to Google!](http://google.com)');
  });
  it('Simple link update', () => {
    const oldStr = 'You can even [link to Google!](http://google.com)';
    const newStr = 'You can even [link to Google with a query!](http://google.com/search?q=test)';
    const diff = markdownDiff(oldStr, newStr);
    expect(diff).equal('You can even <del>[link to Google!](http://google.com)</del><ins>[link to Google with a query!](http://google.com/search?q=test)</ins>');
  });
});
