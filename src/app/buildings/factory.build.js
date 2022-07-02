class FactoryBuild extends BasicBuild {
  constructor(price = 50) {
    super(0, price, 1.4, 2, null, "factory");
    this.entity = document.querySelector(".factory-entity");
  }

  addBuild() {
    super.addBuild(this.entity);
  }
}
