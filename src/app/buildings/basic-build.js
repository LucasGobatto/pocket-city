class BasicBuild {
  moneyDisplay = document.querySelector(".wallet-money");
  populationDisplay = document.querySelector(".population");

  constructor(mutiple, price, fee, profite, population, building) {
    this.price = price;
    this.fee = fee;
    this.profite = profite;
    this.mutiple = mutiple;
    this.population = population;
    this.neighborhood = document.querySelector(".neighborhood");
    this.buildingPriceLabel = document.querySelector(`#${building}-price`);

    this.updatePriceLabel();
  }

  applyFee() {
    this.price *= this.fee;
  }

  getPrice() {
    return this.price;
  }

  getProfite() {
    return this.profite * this.mutiple;
  }

  increasePopulation(population) {
    if (this.population) {
      if (this.population.children) {
        population.children += this.population.children;
        population.total += this.population.children;
      }

      if (this.population.adults) {
        population.adults += this.population.adults;
        population.total += this.population.adults;
      }
    }

    return population;
  }

  addBuild(building) {
    this.mutiple += 1;

    const build = building.cloneNode(true);
    build.style.display = "block";
    this.neighborhood.appendChild(build);
  }

  updateCityStatus(cityStatus) {
    cityStatus.money -= this.getPrice();
    cityStatus.population = this.increasePopulation(cityStatus.population);

    this.moneyDisplay.innerHTML = `$ ${cityStatus.money.toFixed(2)}`;
    this.populationDisplay.innerHTML = `Population: ${cityStatus.population.total}`;

    return cityStatus;
  }

  updatePriceLabel() {
    this.buildingPriceLabel.innerHTML = `$ ${this.price.toFixed(2)}`;
  }
}
