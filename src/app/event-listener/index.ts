import { Service } from "typedi";
import { FactoryBuild, HouseBuild } from "../buildings";
import { Build } from "../models";
import { AddAnimation } from "./add-animation.event-listener";

@Service()
export class AddEventListenerController {
  private readonly buildings: Build[];

  constructor(private readonly houseBuild: HouseBuild, private readonly factoryBuild: FactoryBuild) {
    this.buildings = [this.houseBuild, this.factoryBuild];
  }

  addEventListeners() {
    this.buildings.forEach((build) => {
      build.getButton().addEventListener("click", () => {
        if (!build.animated) {
          AddAnimation.animate(build.getSlider(), build.getAnimationTime());
          build.setAnimation();
        }

        build.addBuild();
      });
    });
  }
}
