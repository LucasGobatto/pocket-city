import { Population, Building, CityStatus } from "../models";
import { moneyDisplay, neighborhood, populationDisplay } from "../tags";

export abstract class BasicBuild {
  protected price: number;
  protected fee: number;
  protected profite: number;
  protected mutiple: number;
  protected population: Population;
  protected entity: Element;
  protected buildingPriceLabel: Element;

  constructor(mutiple: number, price: number, fee: number, profite: number, population: Population, building: Building) {
    this.price = price;
    this.fee = fee;
    this.profite = profite;
    this.mutiple = mutiple;
    this.population = population;
    this.entity = document.querySelector(`.${building}-entity`);
    this.buildingPriceLabel = document.querySelector(`#${building}-price`);

    this.updatePriceLabel();
  }

  applyFee() {
    this.price *= this.fee;

    return this;
  }

  getPrice() {
    return this.price;
  }

  getProfite() {
    return this.profite * this.mutiple;
  }

  increasePopulation(population: Population): Population {
    if (this.population?.children) {
      population.children += this.population.children;
      population.total += this.population.children;
    }

    if (this.population?.adults) {
      population.adults += this.population.adults;
      population.total += this.population.adults;
    }

    return population;
  }

  addBuild(building: Element, icon: any) {
    this.mutiple += 1;
    const image = new Image();
    image.src = icon;

    const build: any = building.cloneNode(true);
    build.style.display = "block";
    build.style.backgroundImage = `url(${image.src})`;

    neighborhood.appendChild(build);

    return this;
  }

  updateCityStatus(cityStatus: CityStatus): CityStatus {
    const currentMoney = cityStatus.money - this.getPrice();
    const population = this.increasePopulation(cityStatus.population);

    moneyDisplay.innerHTML = `$ ${currentMoney.toFixed(2)}`;
    populationDisplay.innerHTML = `Population: ${population.total}`;

    return { money: currentMoney, population };
  }

  updatePriceLabel() {
    this.buildingPriceLabel.innerHTML = `$ ${this.price.toFixed(2)}`;
    return this;
  }

  setActive(active: boolean, building: Building) {
    const button = document.querySelector(`#${building}-button`);

    if (active) {
      button.setAttribute("name", "ative");
    } else {
      button.setAttribute("name", "disative");
    }
  }
}
