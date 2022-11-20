/**
 * Factory method + abstact factory + template method.
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

}

export class ConcreteProduct extends Product {

}

export abstract class Creator {
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
