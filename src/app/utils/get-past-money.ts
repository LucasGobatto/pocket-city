import { GameStats } from "../game-stats";

export function getPastMoney(value: number, timeout: number, price: number, setActive: (active: boolean) => void): Promise<void> {
  console.log("berofePromise");
  return new Promise((res) => {
    setTimeout(() => {
      console.log("afterPromise");
      GameStats.updateMoney(value);

      setActive(GameStats.money >= price);
      res();
    }, timeout);
  });
}
