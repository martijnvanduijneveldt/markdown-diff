import { DiffState } from '../jsdiff.util';

export interface DiffEle {
  state: DiffState;
}

export class DiffString implements DiffEle {
  value: string;
  state: DiffState;

  constructor(value: string, state: DiffState) {
    this.value = value;
    this.state = state;
  }
}

export class BlockQuoteDiff implements DiffEle {
  state: DiffState;
  depth: number;
  value: string;

  constructor(value: string, depth: number, state: DiffState) {
    this.value = value;
    this.depth = depth;
    this.state = state;
  }

}
