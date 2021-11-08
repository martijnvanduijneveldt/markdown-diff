/* tslint:disable:max-line-length */
import *  as marked from 'marked';
import { Renderer, Token, Tokens, TokensList } from 'marked';
import { TypeToString } from './type-to-string';
import { TypeMapping } from './type-mapping';
import { JsDiffUtil } from './jsdiff.util';

export class Generator {
  private static newLine = '\n';

  private rendered = new Renderer();

  /**
   * exec
   */
  public exec(oldString: string, newString: string) {
    const oldLexer = new marked.Lexer();
    const tokens = oldLexer.lex(oldString);

    const newLexer = new marked.Lexer();
    const newTokens = newLexer.lex(newString);

    console.debug(JSON.stringify(tokens, null, 4));
    console.debug(JSON.stringify(newTokens, null, 4));

    const output = this.walkTokens(newTokens, tokens);

    return output.join('');
  }

  private walkTokens(newTokens: TokensList | null | undefined, oldTokens: TokensList | null | undefined): string[] {
    const output = [];
    let i = 0;

    const innerNew = newTokens ? newTokens : [];
    const innerOld = oldTokens ? oldTokens : [];

    for (i; i < innerOld.length && i < innerNew.length; i += 1) {
      output.push(...this.handleToken(innerNew[i], innerOld[i]));
    }

    for (i; i < innerOld.length; i += 1) {
      output.push(...this.handleToken(null, innerOld[i]));
    }
    for (i; i < innerNew.length; i += 1) {
      output.push(...this.handleToken(innerNew[i], null));
    }

    return output;
  }

  private handleToken(newToken: Token | null, oldToken: Token | null): string[] {
    const output = [];
    console.log(oldToken, newToken);
    if ((oldToken === null || TypeMapping.isList(oldToken)) && (newToken === null || TypeMapping.isList(newToken))) {
      const prefixOld = oldToken && oldToken.ordered ? <number><unknown>oldToken.start : null;
      const prefixNew = newToken && newToken.ordered ? <number><unknown>newToken.start : null;

      let prefix = prefixNew ? prefixNew : prefixOld;

      const oldItems = oldToken ? oldToken.items.map(e => e.text) : [];
      const newItems = newToken ? newToken.items.map(e => e.text) : [];

      // tslint:disable-next-line:no-increment-decrement
      const res = JsDiffUtil.diffArrayByIndex(newItems, oldItems).map(e => (prefix ? `${prefix++}. ${e}` : `* ${e}`));
      output.push(res.join(Generator.newLine));
    }
    if ((oldToken === null || TypeMapping.isLink(oldToken)) && (newToken === null || TypeMapping.isLink(newToken))) {

      if (oldToken?.text !== newToken?.text || oldToken?.href !== newToken?.href || oldToken?.title !== newToken?.title) {
        if (oldToken) {
          output.push(TypeToString.link(oldToken, 'del'));
        }
        if (newToken) {
          output.push(TypeToString.link(newToken, 'ins'));
        }
      } else {
        output.push(TypeToString.link(newToken as Tokens.Link, ''));
      }

      return output; // Skip children
    }
    if ((oldToken === null || TypeMapping.isTable(oldToken)) && (newToken === null || TypeMapping.isTable(newToken))) {
      const headers = JsDiffUtil.diffArrayByIndex(newToken?.header, oldToken?.header);
      output.push(`|${headers.join('|')}|${Generator.newLine}`);
      const alignment = newToken ? newToken : oldToken as Tokens.Table;
      output.push(TypeToString.tableAlign(alignment) + Generator.newLine);

      const content = JsDiffUtil.doubleStringArrayDiff(newToken?.cells, oldToken?.cells);

      for (const row of content) {
        output.push(`|${row.join('|')}|${Generator.newLine}`);
      }

      return output; // Skip children
    }
    if ((oldToken === null || TypeMapping.isHeading(oldToken)) && (newToken === null || TypeMapping.isHeading(newToken))) {
      const count = newToken ? newToken.depth : (oldToken as Tokens.Heading).depth;
      const depth = '#'.repeat(count);

      output.push(`${depth} ${JsDiffUtil.diffWords(newToken?.text, oldToken?.text)}${Generator.newLine}`);

      return output; // Skip children
    }
    if ((oldToken === null || TypeMapping.isBlockQuote(oldToken)) && (newToken === null || TypeMapping.isBlockQuote(newToken))) {
      const newVals = newToken?.tokens.map(e => TypeMapping.isSpace(e) ? '' : e.raw);
      const oldVals = oldToken?.tokens.map(e => TypeMapping.isSpace(e) ? '' : e.raw);
      const res = JsDiffUtil.diffArrayByIndex(newVals, oldVals);
      output.push(res.map(e => `> ${e}`).join(Generator.newLine));
      return output;
    }
    if ((oldToken === null || TypeMapping.isBr(oldToken)) && (newToken === null || TypeMapping.isBr(newToken))) {
      let res = '';
      if (oldToken && !newToken) {
        res = '<del></del>';
      }
      if (!oldToken && newToken) {
        res = '<ins></ins>';
      }
      output.push(res + this.rendered.br());
    }
    if ((oldToken === null || TypeMapping.isText(oldToken)) && (newToken === null || TypeMapping.isText(newToken))) {
      output.push(JsDiffUtil.diffWords(newToken?.text, oldToken?.text));
    }

    if ((oldToken === null || TypeMapping.hasTokens(oldToken)) && (newToken === null || TypeMapping.hasTokens(newToken))) {
      output.push(...this.walkTokens(newToken?.tokens, oldToken?.tokens));
    }
    return output;
  }

}
