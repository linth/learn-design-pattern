/**
 * Factory Method (FM) + Abstract Factory (AF) + Template Method (TM) - product
 *  - 透過使用 factory 只能用工廠製作出想要的 object.
 * 
 * 1. 建立一個 abstract class: product
 * 2. 建立一個 abstract class: creator，裡面包 product 的 factory method
 * 3. 建立繼承 creator 的 concrete class
 * 
 * 
 * 什麼時候需由 factory method 升級成 abstract factory
 *  - factory 需要製造出許多相似種類的 object，例如: 電動車、腳踏車、汽油車、卡車...等。
 * 
 * 
 * Reference:
 *  - https://carsonwah.github.io/factory-design-pattern.html 
 */


export abstract class Product {
    // abstract class.
}

export class ConcreteProduct extends Product {
    // concrete class.
}

export abstract class Creator {
    // abstract class.
    createProduct() {
        return this.factoryMethod();
    }

    abstract factoryMethod(): Product;
}

export class ConcreteCreator extends Creator {
    factoryMethod(): Product {
        return new ConcreteProduct();
    }
}


let creator = new ConcreteCreator();
let product = creator.createProduct();
console.log('product', product);
