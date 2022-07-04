import { GameStats } from "../game-stats";
import { Build } from "../models";

export function addBuildingEntity(building: Build) {
  const price = building.getPrice();
  const { money, population } = GameStats;

  if (money < price) {
    console.log("not enough money");
    return;
  }

  building.addBuild();

  const newStatus = building.updateCityStatus({ money, population });
  GameStats.money = newStatus.money;
  GameStats.population = { ...GameStats.population, ...newStatus.population };

  building.applyFee();
  building.updatePriceLabel();
}
