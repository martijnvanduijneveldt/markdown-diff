/* tslint:disable:max-line-length */
import { TypeToString } from './type-to-string';
import { TypeMapping } from './type-mapping';
import { JsDiffUtil } from './jsdiff.util';
import { marked } from 'marked';
import Renderer = marked.Renderer;
import TokensList = marked.TokensList;
import Token = marked.Token;
import ListItem = marked.Tokens.ListItem;
import Tokens = marked.Tokens;

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

    const output = this.walkTokens(newTokens, tokens);

    return output.join(Generator.newLine);
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
    const output: string[] = [];
    if ((oldToken === null || TypeMapping.isList(oldToken)) && (newToken === null || TypeMapping.isList(newToken))) {
      const prefixOld = oldToken && oldToken.ordered ? <number><unknown>oldToken.start : null;
      const prefixNew = newToken && newToken.ordered ? <number><unknown>newToken.start : null;

      let prefix = prefixNew ? prefixNew : prefixOld;

      const oldItems = oldToken ? oldToken.items.map((e: ListItem) => e.text) : [];
      const newItems = newToken ? newToken.items.map((e: ListItem) => e.text) : [];

      // tslint:disable-next-line:no-increment-decrement
      const res = JsDiffUtil.diffArrayByIndex(newItems, oldItems).map(e => (prefix ? `${prefix++}. ${e}` : `* ${e}`));
      output.push(...res);
      return output;
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
      const headers = JsDiffUtil.diffArrayByIndex(newToken?.header.map(e => e.text), oldToken?.header.map(e => e.text));
      output.push(`|${headers.join('|')}|`);
      const alignment = newToken ? newToken : oldToken as Tokens.Table;
      output.push(TypeToString.tableAlign(alignment));

      const content = JsDiffUtil.doubleStringArrayDiff(newToken?.rows.map(e => e.map(i => i.text)), oldToken?.rows.map(e => e.map(i => i.text)));

      for (const row of content) {
        output.push(`|${row.join('|')}|`);
      }

      return output; // Skip children
    }
    if ((oldToken === null || TypeMapping.isHeading(oldToken)) && (newToken === null || TypeMapping.isHeading(newToken))) {
      const count = newToken ? newToken.depth : (oldToken as Tokens.Heading).depth;
      const depth = '#'.repeat(count);

      output.push(`${depth} ${JsDiffUtil.diffWords(newToken?.text, oldToken?.text)}`);

      return output; // Skip children
    }

    if ((oldToken === null || TypeMapping.isCode(oldToken)) && (newToken === null || TypeMapping.isCode(newToken))) {
      output.push(`\`\`\`${oldToken?.lang}`);

      const content = JsDiffUtil.diffCodeLines(newToken?.text.split(Generator.newLine), oldToken?.text.split(Generator.newLine));
      output.push(content);
      output.push('```');
      return output; // Skip children
    }
    if ((oldToken === null || TypeMapping.isCodespan(oldToken)) && (newToken === null || TypeMapping.isCodespan(newToken))) {
      let res = '';
      if (oldToken?.text !== newToken?.text) {
        if (oldToken) {
          res += `<del>\`${oldToken.text}\`</del>`;
        }
        if (newToken) {
          res += `<ins>\`${newToken.text}\`</ins>`;
        }
      }
      output.push(res);

      return output; // Skip children
    }

    if ((oldToken === null || TypeMapping.isBlockQuote(oldToken)) && (newToken === null || TypeMapping.isBlockQuote(newToken))) {
      const newVals = newToken?.tokens.map(e => TypeMapping.isSpace(e) ? '' : e.raw);
      const oldVals = oldToken?.tokens.map(e => TypeMapping.isSpace(e) ? '' : e.raw);
      const res = JsDiffUtil.diffArrayByIndex(newVals, oldVals);
      output.push(...res.map(e => `> ${e}`));
      return output;
    }
    if ((oldToken === null || TypeMapping.isStrong(oldToken)) && (newToken === null || TypeMapping.isStrong(newToken))) {
      output.push(`**${JsDiffUtil.diffWords(newToken?.text, oldToken?.text)}**`);
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
      output.push(this.walkTokens(newToken?.tokens, oldToken?.tokens).join(''));
    }
    return output;
  }

}
