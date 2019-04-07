type CardName =
  | "Estate"
  | "Duchy"
  | "Province"
  | "Curse"
  | "Copper"
  | "Silver"
  | "Gold"
  | "Smithy";

export abstract class Card {
  public readonly name: CardName;
  public readonly cost: number;

  protected constructor(name: string, cost: number) {
    this.name = name as CardName;
    this.cost = cost;
  }

  public abstract accept(visitor: CardVisitor): void;
}

export abstract class VictoryCard extends Card {
  public readonly points: number;

  protected constructor(name: string, cost: number, points: number) {
    super(name, cost);
    this.points = points;
  }
}

class EstateCard extends VictoryCard {
  constructor() {
    super("Estate", 2, 1);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitEstate(this);
  }
}

export const Estate = new EstateCard();

class DuchyCard extends VictoryCard {
  constructor() {
    super("Duchy", 5, 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitDuchy(this);
  }
}

export const Duchy = new DuchyCard();

class ProvinceCard extends VictoryCard {
  constructor() {
    super("Province", 8, 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitProvince(this);
  }
}

export const Province = new ProvinceCard();

class CurseCard extends VictoryCard {
  constructor() {
    super("Curse", 0, -1);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitCurse(this);
  }
}

export const Curse = new CurseCard();

class GardensCard extends VictoryCard {
  constructor() {
    // TODO Evaluate points for Gardens
    super("Gardens", 4, 0);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitGardens(this);
  }
}

export const Gardens = new GardensCard();

export function isVictoryCard(card: Card): card is VictoryCard {
  return (card as VictoryCard).points !== undefined;
}

export abstract class TreasureCard extends Card {
  public readonly coins: number;

  protected constructor(name: string, cost: number, coins: number) {
    super(name, cost);
    this.coins = coins;
  }
}

class CopperCard extends TreasureCard {
  constructor() {
    super("Copper", 0, 1);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitCopper(this);
  }
}

export const Copper = new CopperCard();

class SilverCard extends TreasureCard {
  constructor() {
    super("Silver", 3, 2);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitSilver(this);
  }
}

export const Silver = new SilverCard();

class GoldCard extends TreasureCard {
  constructor() {
    super("Gold", 6, 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitGold(this);
  }
}

export const Gold = new GoldCard();

export function isTreasureCard(card: Card): card is TreasureCard {
  return (card as TreasureCard).coins !== undefined;
}

export abstract class ActionCard extends Card {}

class CellarCard extends ActionCard {
  constructor() {
    super("Cellar", 2);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitCellar(this);
  }
}

export const Cellar = new CellarCard();

class ChapelCard extends ActionCard {
  constructor() {
    super("Chapel", 2);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitChapel(this);
  }
}

export const Chapel = new ChapelCard();

class MoatCard extends ActionCard {
  constructor() {
    super("Moat", 2);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMoat(this);
  }
}

export const Moat = new MoatCard();

class HarbingerCard extends ActionCard {
  constructor() {
    super("Harbinger", 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitHarbinger(this);
  }
}

export const Harbinger = new HarbingerCard();

class MerchantCard extends ActionCard {
  constructor() {
    super("Merchant", 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMerchant(this);
  }
}

export const Merchant = new MerchantCard();

class VassalCard extends ActionCard {
  constructor() {
    super("Vassal", 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitVassal(this);
  }
}

export const Vassal = new VassalCard();

class VillageCard extends ActionCard {
  constructor() {
    super("Village", 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitVillage(this);
  }
}

export const Village = new VillageCard();

class WorkshopCard extends ActionCard {
  constructor() {
    super("Workshop", 3);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitWorkshop(this);
  }
}

export const Workshop = new WorkshopCard();

class MilitiaCard extends ActionCard {
  constructor() {
    super("Militia", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMilitia(this);
  }
}

export const Militia = new MilitiaCard();

class MoneylenderCard extends ActionCard {
  constructor() {
    super("Moneylender", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMoneylender(this);
  }
}

export const Moneylender = new MoneylenderCard();

class PoachCard extends ActionCard {
  constructor() {
    super("Poacher", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitPoacher(this);
  }
}

export const Poacher = new PoachCard();

class RemodelCard extends ActionCard {
  constructor() {
    super("Remodel", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitRemodel(this);
  }
}

export const Remodel = new RemodelCard();

class SmithyCard extends ActionCard {
  constructor() {
    super("Smithy", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitSmithy(this);
  }
}

export const Smithy = new SmithyCard();

class ThroneRoomCard extends ActionCard {
  constructor() {
    super("ThroneRoom", 4);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitThroneRoom(this);
  }
}

export const ThroneRoom = new ThroneRoomCard();

class BanditCard extends ActionCard {
  constructor() {
    super("Bandit", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitBandit(this);
  }
}

export const Bandit = new BanditCard();

class FestivalCard extends ActionCard {
  constructor() {
    super("Festival", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitFestival(this);
  }
}

export const Festival = new FestivalCard();

class LaboratoryCard extends ActionCard {
  constructor() {
    super("Laboratory", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitLaboratory(this);
  }
}

export const Laboratory = new LaboratoryCard();

class LibraryCard extends ActionCard {
  constructor() {
    super("Library", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitLibrary(this);
  }
}

export const Library = new LibraryCard();

class MarketCard extends ActionCard {
  constructor() {
    super("Market", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMarket(this);
  }
}

export const Market = new MarketCard();

class MineCard extends ActionCard {
  constructor() {
    super("Mine", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitMine(this);
  }
}

export const Mine = new MineCard();

class SentryCard extends ActionCard {
  constructor() {
    super("Sentry", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitSentry(this);
  }
}

export const Sentry = new SentryCard();

class WitchCard extends ActionCard {
  constructor() {
    super("Witch", 5);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitWitch(this);
  }
}

export const Witch = new WitchCard();

class ArtisanCard extends ActionCard {
  constructor() {
    super("Artisan", 6);
  }

  public accept(visitor: CardVisitor): void {
    visitor.visitArtisan(this);
  }
}

export const Artisan = new ArtisanCard();

export function isActionCard(card: Card): card is ActionCard {
  return !isVictoryCard(card) && !isTreasureCard(card);
}

interface CardVisitor {
  visitEstate(estate: EstateCard): void;
  visitDuchy(duchy: DuchyCard): void;
  visitProvince(province: ProvinceCard): void;
  visitCurse(curse: CurseCard): void;
  visitGardens(gardens: GardensCard): void;

  visitCopper(copper: CopperCard): void;
  visitSilver(silver: SilverCard): void;
  visitGold(gold: GoldCard): void;

  visitCellar(cellar: CellarCard): void;
  visitChapel(chapel: ChapelCard): void;
  visitMoat(moat: MoatCard): void;
  visitHarbinger(harbinger: HarbingerCard): void;
  visitMerchant(merchant: MerchantCard): void;
  visitVassal(vassal: VassalCard): void;
  visitVillage(village: VillageCard): void;
  visitWorkshop(workshop: WorkshopCard): void;

  visitMilitia(militia: MilitiaCard): void;
  visitMoneylender(moneylender: MoneylenderCard): void;
  visitPoacher(poacher: PoachCard): void;
  visitRemodel(remodel: RemodelCard): void;
  visitSmithy(smithy: SmithyCard): void;
  visitThroneRoom(throneRoom: ThroneRoomCard): void;

  visitBandit(bandit: BanditCard): void;
  visitFestival(festival: FestivalCard): void;
  visitLaboratory(laboratory: LaboratoryCard): void;
  visitLibrary(library: LibraryCard): void;
  visitMarket(market: MarketCard): void;
  visitMine(mine: MineCard): void;
  visitSentry(sentry: SentryCard): void;
  visitWitch(witch: WitchCard): void;

  visitArtisan(artisan: ArtisanCard): void;
}
