import { diffWords, Change } from 'diff';
import { DiffUtil } from './diff.util';
import { DiffEle } from './models/models';

export enum DiffState {
  Exists = 'Exists',
  Added = 'Added',
  Removed = 'Removed',
}



export class JsDiffUtil {
  static fullDiff(oldStr: string | null | undefined, newStr: string | null | undefined): string {
    if (oldStr !== newStr) {
      if (!oldStr) {
        return `<ins>${newStr}</ins>`;
      }
      if (!newStr) {
        return `<del>${oldStr}</del>`;
      }
      return `<del>${oldStr}</del><ins>${newStr}</ins>`;
    }
    return oldStr ? oldStr : '';
  }

  static diffMarkdown(newStr: string | null | undefined, oldStr: string | null | undefined): string {
    return oldStr ? oldStr : '';
  }

  static diffWords(newStr: string | null | undefined, oldStr: string | null | undefined): string {
    const parts = diffWords(oldStr ? oldStr : '', newStr ? newStr : '');
    const output = parts.map(p => JsDiffUtil.getChangeVal(p));
    return output.join('');
  }

  static diffArrayByIndex(newArray: string[] | undefined, oldArray: string[] | undefined): string[] {
    let i = 0;
    const result: string[] = [];
    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];

    while (i < oldArr.length && i < newArr.length) {
      result[i] = JsDiffUtil.diffWords(newArr[i], oldArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = DiffUtil.wrapWithTag(oldArr[i], 'del');
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = DiffUtil.wrapWithTag(newArr[i], 'ins');
    }
    return result;
  }

  public static doubleStringArrayDiff(
    newArray: string[][] | undefined,
    oldArray: string[][] | undefined,
  ): string[][] {
    let i = 0;
    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];
    const result = [];
    while (i < oldArr.length && i < newArr.length) {
      result[i] = this.diffArrayByIndex(newArr[i], oldArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = this.diffArrayByIndex([], oldArr[i]);
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = this.diffArrayByIndex(newArr[i], []);
    }
    return result;
  }

  private static getChangeVal(change: Change): string {
    if (change.added) {
      return DiffUtil.wrapWithTag(change.value, 'ins');
    }
    if (change.removed) {
      return DiffUtil.wrapWithTag(change.value, 'del');
    }
    return change.value;
  }
}
