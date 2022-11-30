/**
 * Factory Method (FM) + Abstract Factory (AF) + Template Method (TM)
 * 
 * Factory design pattern: (三種模式)
 *  - simple factory pattern
 *      - static factory method
 *      - simple factory
 *  - factory method pattern
 * 
 * Reference:
 *  - https://carsonwah.github.io/factory-design-pattern.html
 */



// Static Factory Method, 使用靜態 factory method 來建立 instance.
{
    abstract class Car {
        doors: number = 4;
        windows: number = 4;
        
        static factory(color: Color): Car {
            switch(color) {
                case "RED":
                    return new RedCar();
                case "BLUE":
                    return new BlueCar();
                default:
                    return new RedCar();
            }
        }

        abstract show(): void;
        getCarDoors(): number { return this.doors; }
        getWindows(): number { return this.windows; }
    }

    class Color {

    }

    class RedCar extends Car {
        show(): void {
            console.log('this is red car.');            
        }
    }

    class BlueCar extends Car {
        show(): void {
            console.log('this is blue car.');
        }
    }

    let redCar: Car = Car.factory("RED");
    let blueCar: Car = Car.factory("BLUE");

    redCar.show();
    blueCar.show();
    console.log(blueCar.getCarDoors()); // car door.
    console.log(blueCar.getWindows()); // car windows.    
}

// Simple Factory: 開新的 factory class, 負責生產 Object.
{
    abstract class Car {
        
    }

    class CarFactory {
        createFromColor(color: Color): Car {
            switch(color) {
                case "RED":
                    return new RedCar();
                case "BLUE":
                    return new BlueCar();
                default:
                    return new NormalCar();
            }
        }

        getCarInfo(): void {
            console.log('get car information.');            
        }
    }
    
    class RedCar extends CarFactory {
        getCarInfo(): void {
            console.log('get car information.');            
        }
    }
    
    class BlueCar extends CarFactory {
    
    }
    
    class NormalCar extends CarFactory {
    
    }
    
    class Color {
    
    }

    let factory: CarFactory = new CarFactory();
    let redCar: Car = factory.createFromColor("RED");
    let blueCar: Car = factory.createFromColor("BLUE");

    console.log('redCar', redCar);
    console.log('blueCar', blueCar);

    factory.getCarInfo();
    // redCar.getCarInfo(); // error.
}
