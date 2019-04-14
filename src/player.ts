import { Card } from "./card";
import { shuffle } from "./utils";

export class ActivePool {
  public actions: number = 1;
  public buys: number = 1;
  public coins: number = 0;
}

export class Player {
  public discard: Card[] = [];
  public deck: Card[] = [];
  public setAside: Card[] = [];
  public hand: Card[] = [];
  public pool?: ActivePool;
  public played: Card[] = [];

  constructor(deck: Card[], discard: Card[], hand: Card[]) {
    this.deck = deck;
    this.discard = discard;
    this.hand = hand;
  }

  public setup() {
    this.pool = new ActivePool();
  }

  public cleanup() {
    this.pool = undefined;
    this.discard = [
      ...this.discard,
      ...this.hand,
      ...this.played,
      ...this.setAside
    ];
    this.hand = [];
    this.played = [];
    this.setAside = [];
  }

  public drawNCards(n: number): Card[] {
    if (this.deck.length < n) {
      this.shuffle();
    }
    const numOfCardsToDraw = Math.min(n, this.deck.length);
    const cards = this.deck.slice(0, numOfCardsToDraw);
    this.hand = [...this.hand, ...cards];
    this.deck = this.deck.slice(numOfCardsToDraw);
    return cards;
  }

  public playACard<T extends Card>(card: T): T | undefined {
    const index = this.hand.indexOf(card);
    if (index < 0) {
      return;
    }
    const played = this.hand.splice(index, 1)[0] as T;
    this.played = [...this.played, played];
    return played;
  }

  public discardACard(card: Card): Card | undefined {
    const index = this.hand.indexOf(card);
    if (index < 0) {
      return;
    }
    const toDiscard = this.hand.splice(index, 1)[0];
    this.discard = [...this.discard, toDiscard];
    return toDiscard;
  }

  public moveBackADiscardedCard(card: Card): Card | undefined {
    const index = this.discard.indexOf(card);
    if (index < 0) {
      return;
    }
    const toMoveBack = this.discard.splice(index, 1)[0];
    this.deck = [toMoveBack, ...this.deck];
    return toMoveBack;
  }

  public trashACard(card: Card): Card | undefined {
    const index = this.hand.indexOf(card);
    if (index < 0) {
      return;
    }
    return this.hand.splice(index, 1)[0];
  }

  public setAsideACard(card: Card): Card | undefined {
    const index = this.hand.indexOf(card);
    if (index < 0) {
      return;
    }
    const setAside = this.hand.splice(index, 1)[0];
    this.setAside = [...this.setAside, setAside];
    return setAside;
  }

  public buyACard(card: Card) {
    this.discard = [...this.discard, card];
  }

  public gainACard(card: Card) {
    this.discard = [...this.discard, card];
  }

  public gainACardToHand(card: Card) {
    this.hand = [...this.hand, card];
  }

  private shuffle(): void {
    if (this.discard.length === 0) {
      return;
    }
    shuffle(this.discard);
    this.deck = [...this.deck, ...this.discard];
    this.discard = [];
  }
}
