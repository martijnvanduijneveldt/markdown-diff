import { marked } from 'marked';
import TokensList = marked.TokensList;
import Token = marked.Token;
import Tokens = marked.Tokens;

export interface TokenWithChildren {
  tokens: TokensList;
}

export class TypeMapping {
  static isLink(token: Token): token is Tokens.Link {
    return (token as Tokens.Link).type === 'link';
  }

  static isTable(token: Token): token is Tokens.Table {
    return (token as Tokens.Table).type === 'table';
  }

  static isText(token: Token): token is Tokens.Text {
    return (token as Tokens.Text).type === 'text';
  }

  static isList(token: Token): token is Tokens.List {
    // @ts-ignore
    return (token as Tokens.List).type === 'list';
  }

  static isBlockQuote(token: Token): token is Tokens.Blockquote & TokenWithChildren {
    return (token as Tokens.Blockquote).type === 'blockquote';
  }

  static isBr(token: Token): token is Tokens.Br {
    return (token as Tokens.Br).type === 'br';
  }

  static isCode(token: Token): token is Tokens.Code {
    return (token as Tokens.Code).type === 'code';
  }

  static isCodespan(token: Token): token is Tokens.Codespan {
    return (token as Tokens.Codespan).type === 'codespan';
  }

  static isDef(token: Token): token is Tokens.Def {
    return false;
    // return (token as Tokens.Def) === 'def';
  }

  static isEm(token: Token): token is Tokens.Em {
    return (token as Tokens.Em).type === 'em';
  }

  static isEscape(token: Token): token is Tokens.Escape {
    return (token as Tokens.Escape).type === 'escape';
  }

  static isHr(token: Token): token is Tokens.Hr {
    return (token as Tokens.Hr).type === 'hr';
  }

  static isHtml(token: Token): token is Tokens.HTML {
    return (token as Tokens.HTML).type === 'html';
  }

  static isStrong(token: Token): token is Tokens.Strong {
    return (token as Tokens.Strong).type === 'strong';
  }

  static isTag(token: Token): token is Tokens.Tag {
    const tok = token as Tokens.Tag;
    return tok.inLink !== undefined
      && tok.inRawBlock !== undefined
      && (tok.type === 'html' || tok.type === 'text');
  }

  static isSpace(token: Token): token is Tokens.Space {
    return (token as Tokens.Space).type === 'space';
  }

  static isHeading(token: Token): token is Tokens.Heading {
    return (token as Tokens.Heading).type === 'heading';
  }

  static hasTokens(token: any): token is TokenWithChildren {
    return token && (token as TokenWithChildren).tokens !== undefined;
  }

}
