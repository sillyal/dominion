import { Copper, Gold, Province, Silver } from "../card";
import { Game, Pile } from "../game";
import { Player } from "../player";

describe("Game", () => {
  it("doesn't end with 2 empty piles", () => {
    const game = new Game(
      [],
      [new Pile(Copper, 0), new Pile(Silver, 0), new Pile(Gold, 1)]
    );
    expect(game.ended()).toBe(false);
  });

  it("ends with 3 empty piles", () => {
    const game = new Game(
      [],
      [new Pile(Copper, 0), new Pile(Silver, 0), new Pile(Gold, 0)]
    );
    expect(game.ended()).toBe(true);
  });

  it("ends with empty Province pile", () => {
    const game = new Game([], [new Pile(Province, 0)]);
    expect(game.ended()).toBe(true);
  });

  it("trashes a card", () => {
    const game = new Game([], []);
    const player = new Player([], [], [Copper]);
    game.trashACard(player, Copper);
    expect(game.trash.length).toBe(1);
    expect(game.trash[0]).toBe(Copper);
  });

  it("buys a card", () => {
    const pile = new Pile(Copper, 1);
    const game = new Game([], [pile]);
    const player = new Player([], [], []);
    game.buyACard(player, Copper);
    expect(pile.count).toBe(0);
  });

  it("gains a card", () => {
    const pile = new Pile(Copper, 1);
    const game = new Game([], [pile]);
    const player = new Player([], [], []);
    game.gainACard(player, Copper);
    expect(pile.count).toBe(0);
  });

  it("gains a card to hand", () => {
    const pile = new Pile(Copper, 1);
    const game = new Game([], [pile]);
    const player = new Player([], [], []);
    game.gainACardToHand(player, Copper);
    expect(pile.count).toBe(0);
  });
});
