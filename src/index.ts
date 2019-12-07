import * as JsDiff from 'diff';

export function markdownDiff(oldStr: string, newStr: string): string {
  const output: string[] = [];
  const parts = JsDiff.diffChars(oldStr, newStr);

  for (const part of parts) {
    const value = part.value;

    const prefix = part.added ? '<ins>' : part.removed ? '<del>' : '';
    const posfix = part.added ? '</ins>' : part.removed ? '</del>' : '';

    if (isTable(part)) {
      output.push(tableDiff(value, prefix, posfix));
    } else if (isList(part)) {
      output.push(listDiff(value, prefix, posfix));
    } else {
      output.push(`${prefix}${value}${posfix}`);
    }
  }

  return output.join('');
}

function isList(part: JsDiff.Change) {
  const listRegex = new RegExp('^([\r\n\t ]*)(\\*|-|\\+)');
  return (part.added || part.removed) && listRegex.test(part.value);
}

function listDiff(value: string, prefix: string, posfix: string) {
  const regex = new RegExp('^([\r\n\t ]*)(\\*|-|\\+)([ ]*)(.*)$', 'gm');

  const out = [];
  let match = regex.exec(value);
  while (match !== null) {
    const spaces = match[1];
    const listOp = match[2];
    const afterOpSpaces = match[3];
    const content = match[4];

    out.push(`${spaces}${listOp}${afterOpSpaces}${prefix}${content}${posfix}`);
    match = regex.exec(value);
  }

  return out.join('\n');
}

function isTable(part: JsDiff.Change) {
  return (part.added || part.removed) && part.value.indexOf('|') !== -1;
}

function tableDiff(value: string, prefix: string, posfix: string): string {
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
