export interface CityStatus {
  money: number;
  population: number;
}

export interface Build {
  setImprover: (active: boolean) => void;
  getPrice: () => number;
  getButton: () => HTMLButtonElement;
  getProfite: () => number;
  getPurchaseIconButton: () => HTMLDivElement;
  getAnimationTime: () => number;
  getSlider: () => HTMLDivElement;
  getMoney: () => void;
  addBuild: () => void;
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
