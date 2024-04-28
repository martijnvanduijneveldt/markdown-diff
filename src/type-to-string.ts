import { Tokens } from 'marked';
import { DiffUtil } from './diff.util';

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
        default:
          return '-';
      }
    });
    return `|${res.join('|')}|`;
  }
}
