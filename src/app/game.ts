import { HouseBuild } from "./buildings";
import { AddEventListenerController } from "./event-listener";
import { GameStats } from "./game-stats";
import { Build } from "./models";

export class PocketCityGame {
  private readonly buildings: Build[];
  private readonly addEventListenerController: AddEventListenerController;

  constructor() {
    this.buildings = [new HouseBuild()];
    this.addEventListenerController = new AddEventListenerController(this.buildings);
    this.addEventListenerController.addEventListeners();
  }

  async run() {
    for (let day = 1; true; day++) {
      await this.sleep();
    }
  }

  private sleep(): Promise<void> {
    return new Promise((res) => setTimeout(() => res(), GameStats.gameTicker));
  }
}
