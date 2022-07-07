import { Service } from "typedi";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";

@Service()
export class HouseBuild extends BaseBuild {
  constructor() {
    super({ element: BuildNames.house, price: 7, profite: 1.2, fee: 1.05, animationTime: 3 });
  }
}
