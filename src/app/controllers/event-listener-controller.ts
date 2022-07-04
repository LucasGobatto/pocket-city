import { addBuildingEntity } from "../event-listeners";
import { Build } from "../models";
import { BudgetController } from "./verify-budget-and-update-buttons-controller";

export class EventListenerController {
  private readonly buildings: Build[];

  constructor(buildings: Build[]) {
    this.buildings = buildings;
  }

  addEventListeners() {
    this.buildings.forEach((build) => {
      build.getButton().addEventListener("click", () => {
        addBuildingEntity(build);
        BudgetController.verifyBudgetAndUpdateButtons(this.buildings);
        BudgetController.updateWeekProfite(this.buildings);
      });
    });
  }
}
