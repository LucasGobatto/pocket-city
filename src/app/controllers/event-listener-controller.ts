import { FactoryBuild, HouseBuild } from "../buildings";
import { addBuildingEntity } from "../event-listeners";
import { factoryButton, houseButton } from "../tags";
import { BudgetController } from "./verify-budget-and-update-buttons-controller";

export class EventListenerController {
  private readonly houseBuild: HouseBuild;
  private readonly factoryBuild: FactoryBuild;

  constructor(houseBuild: HouseBuild, factoryBuild: FactoryBuild) {
    this.houseBuild = houseBuild;
    this.factoryBuild = factoryBuild;
  }

  addEventListeners() {
    const buildings = [this.houseBuild, this.factoryBuild];

    factoryButton.addEventListener("click", () => {
      addBuildingEntity(this.factoryBuild);
      BudgetController.verifyBudgetAndUpdateButtons(buildings);
    });

    houseButton.addEventListener("click", () => {
      addBuildingEntity(this.houseBuild);
      BudgetController.verifyBudgetAndUpdateButtons(buildings);
    });
  }
}
