import { Token, Tokens, TokensList } from 'marked';

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


  static isHeading(token: Token): token is Tokens.Heading {
    return (token as Tokens.Heading).type === 'heading';
  }

  static hasTokens(token: any): token is TokenWithChildren {
    return token && (token as TokenWithChildren).tokens !== undefined;
  }

}
