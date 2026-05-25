/**
 * 單一職責原則 (Single Responsibility Principle, SRP)
 * 一個類別應該只有一個理由被修改，即只負責一項職責。
 * Car 類別僅專注於車輛狀態管理，不混入其他職責。
 */
class Car {
  private make: string;
  private model: string;
  private year: number;
  private currentSpeed: number = 0;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  /** 加速 */
  public accelerate(amount: number): void {
    this.currentSpeed += amount;
  }

  /** 減速 */
  public brake(amount: number): void {
    this.currentSpeed -= amount;
  }

  /** 顯示當前速度 */
  public displaySpeed(): void {
    console.log(`目前時速: ${this.currentSpeed} mph`);
  }
}

function main() {
  const car = new Car('Ford', 'Mustang', 2022);
  car.accelerate(20);
  car.displaySpeed();
}

main();

