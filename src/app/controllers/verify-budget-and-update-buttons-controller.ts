import { GameStats } from "../game-stats";
import { Build } from "../models";

export class BudgetController {
  static verifyBudgetAndUpdateButtons(buildings: Build[]) {
    for (const building of buildings) {
      const buildPrice = building.getPrice();

      const hasMoneyToBuild = GameStats.money >= buildPrice;

      building.setActive(hasMoneyToBuild);
    }
  }
}
