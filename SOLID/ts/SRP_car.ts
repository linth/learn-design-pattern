/**
 * Single Responsibility Principle (SRP)
 * 
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

  public accelerate(amount: number): void {
    this.currentSpeed += amount;
  }

  public brake(amount: number): void {
    this.currentSpeed -= amount;
  }

  public displaySpeed(): void {
    console.log(`The car is currently going ${this.currentSpeed} mph`);
  }
}

function main() {
  const car = new Car("Ford", "Mustang", 2022);
  car.accelerate(20);
  car.displaySpeed();
}

main();

