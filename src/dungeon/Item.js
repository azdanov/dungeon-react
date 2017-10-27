// @flow
import { random } from 'lodash';

export default class Item {
  type: string;
  item: { amount?: number, id?: number, action?: string };
  constructor(type: string) {
    this.type = type;
    this.item = this.assign();
  }
  assign() {
    switch (this.type) {
      case 'health':
        return {
          amount: random(1, 50),
        };
      case 'strength':
        return {
          amount: random(1, 50),
        };
      case 'weapon':
        return {
          id: random(10),
          amount: random(1, 50),
        };
      case 'next_level':
        return {
          action: 'next_level',
        };
      default:
        return {
          type: null,
        };
    }
  }
}
