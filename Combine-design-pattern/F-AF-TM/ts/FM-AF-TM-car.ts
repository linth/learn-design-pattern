/**
 * Factory Method (FM) + Abstract Factory (AF) + Template Method (TM) - car example.
 *  - 其實結論就是多建幾個 class 來幫忙寫 new object 的 function，來提供給外部使用。
 * 
 * 
 * Reference:
 *  - https://carsonwah.github.io/factory-design-pattern.html
 */

abstract class PetrolCar {
    // abstract class.
}

class ConcretePetrolCar extends PetrolCar {
    // concrete class.
}

abstract class ElectricCar {
    // abstract class.
}

class ConcreteElectricCar extends ElectricCar {
    // concrete class.
}

abstract class CarFactory {
    abstract manufacturePetrol(): PetrolCar;
    abstract manufactureElectricCar(): ElectricCar;
}

class GermanyCarFactory extends CarFactory {
    manufacturePetrol(): PetrolCar {
        return new ConcretePetrolCar();
    }
    manufactureElectricCar(): ElectricCar {
        return new ConcreteElectricCar();
    }
}


let factory: CarFactory = new GermanyCarFactory();
let petrolCar: PetrolCar = factory.manufacturePetrol();
let electricCar: ElectricCar = factory.manufactureElectricCar();