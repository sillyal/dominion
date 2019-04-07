import { Card, Province } from "./card";
import { Player } from "./player";

export class Game {
  public trash: Card[] = [];
  public piles: Pile[];
  public players: Player[];

  constructor(players: Player[], piles: Pile[]) {
    this.players = players;
    this.piles = piles;
  }

  public ended(): boolean {
    const cards = this.piles
      .filter(pile => pile.count === 0)
      .map(pile => pile.card);
    return cards.indexOf(Province) > -1 || cards.length >= 3;
  }

  public trashACard(player: Player, card: Card) {
    const toTrash = player.trashACard(card);
    if (toTrash) {
      this.trash = [...this.trash, toTrash];
    }
  }

  public buyACard(player: Player, card: Card) {
    const piles = this.piles.filter(
      pile => pile.card === card && pile.count > 0
    );
    if (piles && piles.length) {
      player.buyACard(piles[0].card);
      piles[0].count -= 1;
    }
  }

  public gainACard(player: Player, card: Card) {
    const piles = this.piles.filter(
      pile => pile.card === card && pile.count > 0
    );
    if (piles && piles.length) {
      player.gainACard(piles[0].card);
      piles[0].count -= 1;
    }
  }

  public gainACardToHand(player: Player, card: Card) {
    const piles = this.piles.filter(
      pile => pile.card === card && pile.count > 0
    );
    if (piles && piles.length) {
      player.gainACardToHand(piles[0].card);
      piles[0].count -= 1;
    }
  }
}

export class Pile {
  public card: Card;
  public count: number;

  constructor(card: Card, count: number) {
    this.card = card;
    this.count = count;
  }
}
