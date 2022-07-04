import { GameStats } from "../game-stats";
import { Build } from "../models";
import { weekProfite } from "../tags";

export class BudgetController {
  static verifyBudgetAndUpdateButtons(buildings: Build[]) {
    for (const building of buildings) {
      const buildPrice = building.getPrice();

      const hasMoneyToBuild = GameStats.money >= buildPrice;

      building.setActive(hasMoneyToBuild);
    }
  }

  static updateWeekProfite(buildings: Build[]) {
    const buildingsProfite = buildings.reduce((concat, build) => (concat += build.getProfite()), 0);

    const profite = buildingsProfite + GameStats.profite.day + GameStats.population.total * GameStats.profite.citizens;

    weekProfite.innerHTML = `+$ ${profite.toFixed(2)} / week`;
  }
}
