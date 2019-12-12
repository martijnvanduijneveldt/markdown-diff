import { Generator } from './generator';

export function markdownDiff(oldStr: string, newStr: string): string {
  return new Generator().exec(oldStr, newStr);
}
