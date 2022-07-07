import { moneyDisplay } from "./tags";

export class GameStats {
  static gameTicker = 200;
  static money = 200;
  static population = 0;

  static updateMoney(amount: number) {
    GameStats.money += amount;
    moneyDisplay.innerHTML = `$ ${GameStats.money.toFixed(2)}`;
  }
}
