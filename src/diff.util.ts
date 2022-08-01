import { JsDiffUtil } from './jsdiff.util';

export class DiffUtil {

  public static wrapWithTag(input: string, tag: string) {
    return tag ? `<${tag}>${input}</${tag}>` : input;
  }
}
