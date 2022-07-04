export class RateController {
  static rate = {
    birth: 0.5,
    death: 0.8,
  };

  static birthRateController(citizens: number) {
    return Number((citizens * (1 + RateController.rate.birth)).toFixed(0));
  }

  static deathRateController(citizens: number) {
    return Number((citizens * (1 - RateController.rate.death)).toFixed(0));
  }

  static demandRateController() {}
}
