import { Card } from "./card";
import { shuffle } from "./utils";

export interface ActivePool {
  actions: number;
  buys: number;
  coins: number;
}

export class Player {
  public reacting: boolean = false;
  private discard: Card[] = [];
  private deck: Card[] = [];
  private setAside: Card[] = [];
  private hand: Card[] = [];
  private pool?: ActivePool;
  private played: Card[] = [];

  constructor(deck: Card[], discard: Card[], hand: Card[]) {
    this.deck = deck;
    this.discard = discard;
    this.hand = hand;
  }

  public isPlaying(): boolean {
    return this.pool !== undefined;
  }

  public setup(pool?: ActivePool): void {
    this.pool = pool || { actions: 1, buys: 1, coins: 0 };
  }

  public updatePool(pool: ActivePool): void {
    if (this.pool) {
      this.pool.actions += pool.actions;
      this.pool.buys += pool.buys;
      this.pool.coins += pool.coins;
    }
  }

  public canPlayActionCard(): boolean {
    return this.pool !== undefined && this.pool.actions > 0;
  }

  public canBuyCard(): boolean {
    return this.pool !== undefined && this.pool.buys > 0;
  }

  public getCoins(): number {
    return this.pool ? this.pool.coins : 0;
  }

  public cleanup(): void {
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

  public putACardFromHandOntoDeck(card: Card): Card | undefined {
    const index = this.hand.indexOf(card);
    if (index < 0) {
      return;
    }
    const toMove = this.hand.splice(index, 1)[0];
    this.deck = [toMove, ...this.deck];
    return toMove;
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

  public buyACard(card: Card): void {
    this.discard = [...this.discard, card];
  }

  public gainACard(card: Card): void {
    this.discard = [...this.discard, card];
  }

  public gainACardToHand(card: Card): void {
    this.hand = [...this.hand, card];
  }

  public getDiscard(): Card[] {
    return this.discard;
  }

  public getDeck(): Card[] {
    return this.deck;
  }

  public getSetAside(): Card[] {
    return this.setAside;
  }

  public getHand(): Card[] {
    return this.hand;
  }

  public getPlayed(): Card[] {
    return this.played;
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
