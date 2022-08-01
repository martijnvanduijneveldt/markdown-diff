import { DiffUtil } from './diff.util';
import { marked } from 'marked';
import Tokens = marked.Tokens;

export class TypeToString {
  static link(tok: Tokens.Link, tag: string) {
    const title = tok.title ? ` ${tok.title}` : '';
    return DiffUtil.wrapWithTag(`[${tok.text}](${tok.href}${title})`, tag);
  }

  static tableAlign(tok: Tokens.Table) {
    const res = tok.align.map((e) => {
      switch (e) {
        case 'center':
          return ':-:';
        case 'right':
          return '-:';
      }
      return '-';
    });
    return `|${res.join('|')}|`;
  }
}
