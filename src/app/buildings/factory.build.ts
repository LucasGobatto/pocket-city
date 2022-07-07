import { Service } from "typedi";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";

@Service()
export class FactoryBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: 10,
      element: BuildNames.factory,
      fee: 1.4,
      price: 50,
      profite: 1.2,
    });
  }
}
