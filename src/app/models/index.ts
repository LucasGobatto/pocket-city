export interface CityStatus {
  money: number;
  population: number;
}

export interface Build {
  setImprover: (active: boolean) => void;
  setInitialActive: () => void;
  setMultiplePurchaseValue: () => void;
  getPrice: () => number;
  getButton: () => HTMLButtonElement;
  getProfite: () => number;
  getProgressBar: () => HTMLDivElement;
  getPurchaseIconButton: () => HTMLDivElement;
  getMultiplePurchaseButton: () => HTMLButtonElement;
  getAnimationTime: () => number;
  getSlider: () => HTMLDivElement;
  getMoney: () => void;
  addBuild: () => void;
  observerMoneyAndSetActive: (where: string) => void;
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
