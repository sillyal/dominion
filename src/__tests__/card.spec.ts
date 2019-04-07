import {
  Copper,
  Estate,
  isActionCard,
  isTreasureCard,
  isVictoryCard,
  Smithy
} from "..";

it("filters treasure cards", () => {
  const result = [Estate, Copper].filter(isTreasureCard);
  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
  expect(result[0]).toBe(Copper);
});

it("filters victory cards", () => {
  const result = [Estate, Copper].filter(isVictoryCard);
  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
  expect(result[0]).toBe(Estate);
});

it("filters action cards", () => {
  const result = [Estate, Copper, Smithy].filter(isActionCard);
  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
  expect(result[0]).toBe(Smithy);
});
