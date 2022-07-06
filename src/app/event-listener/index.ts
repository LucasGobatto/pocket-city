import { Build } from "../models";
import { AddAnimation } from "./add-animation.event-listener";

export class AddEventListenerController {
  private readonly buildings: Build[];

  constructor(buildings: Build[]) {
    this.buildings = buildings;
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
