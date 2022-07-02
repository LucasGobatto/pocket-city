class HouseBuild extends BasicBuild {
  constructor(price = 5) {
    super(0, price, 1.2, 0.2, { children: 2, adults: 2 }, "house");
    this.entity = document.querySelector(".house-entity");
  }

  addBuild() {
    super.addBuild(this.entity);
  }
}
