import * as JsDiff from 'diff';
import { Helper } from './helper';

export class Generator {
  private static listRegexWithContent = /^([\r\n\t ]*)(\*|-|\+|\d+\.)([ ]*)(.*)$/gm;
  private static titleRegexWithContent = /^([\r\n\t ]*)(#+)([ ]*)(.*)$/gm;

  /**
   * exec
   */
  public exec(oldString: string, newString: string) {
    const output: string[] = [];
    const parts = JsDiff.diffChars(oldString, newString);

    for (const part of parts) {
      const value = part.value;

      const prefix = part.added ? '<ins>' : part.removed ? '<del>' : '';
      const posfix = part.added ? '</ins>' : part.removed ? '</del>' : '';

      if (Helper.isTitle(part)) {
        output.push(this.titleDiff(value, prefix, posfix));
      } else if (Helper.isTable(part)) {
        output.push(this.tableDiff(value, prefix, posfix));
      } else if (Helper.isList(part)) {
        output.push(this.listDiff(value, prefix, posfix));
      } else {
        output.push(`${prefix}${value}${posfix}`);
      }
    }

    return output.join('');
  }

  private titleDiff(value: string, prefix: string, posfix: string) {
    const out = [];
    let match = Generator.titleRegexWithContent.exec(value);
    while (match !== null) {
      const spaces = match[1];
      const listOp = match[2];
      const afterOpSpaces = match[3];
      const content = match[4];

      out.push(`${spaces}${listOp}${afterOpSpaces}${prefix}${content}${posfix}`);
      match = Generator.titleRegexWithContent.exec(value);
    }

    return out.join('\n');
  }

  private listDiff(value: string, prefix: string, posfix: string) {
    const out = [];
    let match = Generator.listRegexWithContent.exec(value);
    while (match !== null) {
      const spaces = match[1];
      const listOp = match[2];
      const afterOpSpaces = match[3];
      const content = match[4];

      out.push(`${spaces}${listOp}${afterOpSpaces}${prefix}${content}${posfix}`);
      match = Generator.listRegexWithContent.exec(value);
    }

    return out.join('\n');
  }

  private tableDiff(value: string, prefix: string, posfix: string): string {
    const out: string[] = [];

    const split = value.split('|');

    const startWithPipe = split[0].length === 0 ? '|' : '';
    const endsWithPipe = split[split.length - 1].length === 0 ? '|' : '';

    const filtered = split.filter(el => el.length !== 0);
    for (const val of filtered) {
      out.push(`${prefix}${val}${posfix}`);
    }

    return startWithPipe + out.join('|') + endsWithPipe;
  }
}
