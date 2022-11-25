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



// Static Factory Method
{
    abstract class Car {
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
    }

    class Color {

    }

    class RedCar extends Car {

    }

    class BlueCar extends Car {

    }

    let redCar: Car = Car.factory("RED");
    let blueCar: Car = Car.factory("BLUE");
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
    }
    
    class RedCar extends CarFactory {
    
    }
    
    class BlueCar extends CarFactory {
    
    }
    
    class NormalCar extends CarFactory {
    
    }
    
    class Color {
    
    }

    let factory: CarFactory = new CarFactory();
    let redCar: Car = factory.createFromColor("RED");
    
}
