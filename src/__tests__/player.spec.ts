import { Card, Copper, Silver } from "../card";
import { Player } from "../player";

describe("Player", () => {
  it("draws when enough cards in the deck", () => {
    const player = new Player([Copper, Silver], [], []);
    const drawn = player.drawNCards(1);
    expectExactlyOneCard(drawn, Copper);
    expectExactlyOneCard(player.hand, Copper);
  });

  it("shuffles discardCard when not enough cards in the deck", () => {
    const player = new Player([], [Copper], [Silver]);
    const drawn = player.drawNCards(1);
    expectExactlyOneCard(drawn, Copper);
    expect(player.hand.length).toBe(2);
    expect(player.hand[0]).toBe(Silver);
    expect(player.hand[1]).toBe(Copper);
  });

  it("doesn't fail when not enough cards at all", () => {
    const player = new Player([], [Copper], []);
    const drawn = player.drawNCards(2);
    expectExactlyOneCard(drawn, Copper);
    expectExactlyOneCard(player.hand, Copper);
  });

  it("doesn't fail when no cards to shuffle", () => {
    const player = new Player([Copper], [], []);
    const drawn = player.drawNCards(2);
    expectExactlyOneCard(drawn, Copper);
    expectExactlyOneCard(player.hand, Copper);
  });

  it("plays a treasure card", () => {
    const player = new Player([], [], [Copper]);
    const played = player.playACard(Copper);
    expect(played).toBe(Copper);
  });

  it("discards a card", () => {
    const player = new Player([], [], [Copper]);
    const discarded = player.discardACard(Copper);
    expect(discarded).toBe(Copper);
    expectExactlyOneCard(player.discard, Copper);
  });

  it("moves back a discarded card", () => {
    const player = new Player([Copper], [Silver], []);
    const movedBack = player.moveBackADiscardedCard(Silver);
    expect(movedBack).toBe(Silver);
    expect(player.deck.length).toBe(2);
    expect(player.deck[0]).toBe(Silver);
    expect(player.deck[1]).toBe(Copper);
  });

  it("trashes a card", () => {
    const player = new Player([], [], [Copper]);
    const trashed = player.trashACard(Copper);
    expect(trashed).toBe(Copper);
    // expectExactlyOneCard(game.trash, Copper);
  });

  it("sets aside a card", () => {
    const player = new Player([], [], [Copper]);
    const setAside = player.setAsideACard(Copper);
    expect(setAside).toBe(Copper);
    expectExactlyOneCard(player.setAside, Copper);
  });

  it("buys a card", () => {
    const player = new Player([], [Silver], []);
    player.buyACard(Copper);
    expect(player.discard.length).toBe(2);
    expect(player.discard[0]).toBe(Silver);
    expect(player.discard[1]).toBe(Copper);
  });

  it("gains a card", () => {
    const player = new Player([], [Silver], []);
    player.gainACard(Copper);
    expect(player.discard.length).toBe(2);
    expect(player.discard[0]).toBe(Silver);
    expect(player.discard[1]).toBe(Copper);
  });

  it("gains a card to hand", () => {
    const player = new Player([], [Silver], []);
    player.gainACardToHand(Copper);
    expectExactlyOneCard(player.hand, Copper);
  });
});

function expectExactlyOneCard(drawn: Card[], card: Card) {
  expect(drawn).not.toBeNull();
  expect(drawn.length).toBe(1);
  expect(drawn[0]).toBe(card);
}
