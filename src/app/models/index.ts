export interface CityStatus {
  money: number;
  population: number;
}

export interface Build {
  animated: boolean;
  setAnimation: () => void;
  getButton: () => HTMLButtonElement;
  getProfite: () => number;
  getAnimationTime: () => number;
  getSlider: () => HTMLDivElement;
  addBuild: () => void;
  updatePriceLabel: () => this;
}

export enum BuildNames {
  house = "house",
  factory = "factory",
  shop = "shop",
  school = "school",
  publicTransport = "public-transport",
  usine = "usine",
  church = "church",
  mall = "mall",
  airport = "airport",
  cityHall = "city-hall",
}
