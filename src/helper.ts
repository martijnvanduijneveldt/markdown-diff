import { Change } from 'diff';

export class Helper {
  private static titleRegex = /([\r\n\t ]*)(#+)/;
  private static listRegex = /^([\r\n\t ]*)(\*|-|\+|\d+\.)/;

  static isTitle(part: Change): boolean {
    return !!(part.added || part.removed) && Helper.titleRegex.test(part.value);
  }

  static isList(part: Change): boolean {
    return !!(part.added || part.removed) && Helper.listRegex.test(part.value);
  }

  static isTable(part: Change): boolean {
    return !!(part.added || part.removed) && part.value.indexOf('|') !== -1;
  }
}
