export interface Population {
  adults: number;
  children: number;
  total: number;
}

export interface CityStatus {
  money: number;
  population: Population;
}

export type Building = "house" | "factory";

export interface Build {
  applyFee: () => this;
  getPrice: () => number;
  getProfite: () => number;
  increasePopulation: (population: Population) => Population;
  addBuild: () => this;
  updateCityStatus: (cityStatus: CityStatus) => CityStatus;
  updatePriceLabel: () => this;
  setActive: (active: boolean) => void;
  getButton: () => Element;
}
