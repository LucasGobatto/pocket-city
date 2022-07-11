export interface CityStatus {
  money: number;
  population: number;
}

export interface Build {
  setImprover: VoidFunction;
  setInitialActive: VoidFunction;
  setMultiplePurchaseValue: VoidFunction;
  getMaintainerCardProps: () => CardProps;
  getPrice: () => number;
  getButton: () => HTMLButtonElement;
  getProfite: () => number;
  getProgressBar: () => HTMLDivElement;
  getPurchaseIconButton: () => HTMLDivElement;
  getAnimationTime: () => number;
  getSlider: () => HTMLDivElement;
  getMoney: VoidFunction;
  addBuild: VoidFunction;
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

export interface CardProps {
  title: string;
  description: string;
  price: number;
  wasBought: boolean;
  icon: any;
  isActive?: boolean;
  eventListener: VoidFunction;
}
