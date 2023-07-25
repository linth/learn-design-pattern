/**
 * product example for SOLID.
 * 
 * 
 */

{

  // Interface for product operations
  interface Product {
    getName(): string;
    getPrice(): number;
    getStock(): number;
  }

  // Single Responsibility Principle (SRP)
  // Each class has a single responsibility
  class Book implements Product {
    private name: string;
    private price: number;
    private stock: number;

    constructor(name: string, price: number, stock: number) {
      this.name = name;
      this.price = price;
      this.stock = stock;
    }

    getName(): string {
      return this.name;
    }

    getPrice(): number {
      return this.price;
    }

    getStock(): number {
      return this.stock;
    }
  }

  class Clothing implements Product {
    private name: string;
    private price: number;
    private stock: number;

    constructor(name: string, price: number, stock: number) {
      this.name = name;
      this.price = price;
      this.stock = stock;
    }

    getName(): string {
      return this.name;
    }

    getPrice(): number {
      return this.price;
    }

    getStock(): number {
      return this.stock;
    }
  }

  // 折扣產品
  // Open/Closed Principle (OCP)
  // We can easily extend the system without modifying existing code
  class DiscountedProduct implements Product { 
    private product: Product;
    private discount: number;

    constructor(product: Product, discount: number) {
      this.product = product;
      this.discount = discount;
    }

    getName(): string {
      return `${this.product.getName()} (Discounted)`;
    }

    getPrice(): number {
      return this.product.getPrice() * (1 - this.discount);
    }

    getStock(): number {
      return this.product.getStock();
    }
  }

  // Liskov Substitution Principle (LSP)
  // We can safely use a subclass in place of its superclass
  function printProductDetails(product: Product): void {
    console.log(`Name: ${product.getName()}`);
    console.log(`Price: $${product.getPrice()}`);
    console.log(`Stock: ${product.getStock()}`);
  }

  // Interface Segregation Principle (ISP)
  // Each class implements only the methods it needs
  interface BookStore {
    listBooks(): Book[];
  }

  interface ClothingStore {
    listClothing(): Clothing[];
  }

  class BookStoreImpl implements BookStore {
    private books: Book[];

    constructor(books: Book[]) {
      this.books = books;
    }

    listBooks(): Book[] {
      return this.books;
    }
  }

  class ClothingStoreImpl implements ClothingStore {
    private clothingItems: Clothing[];

    constructor(clothingItems: Clothing[]) {
      this.clothingItems = clothingItems;
    }

    listClothing(): Clothing[] {
      return this.clothingItems;
    }
  }

  // Dependency Inversion Principle (DIP)
  // High-level modules depend on abstractions (interfaces)
  function printStoreItems(store: BookStore | ClothingStore): void {
    if (store instanceof BookStoreImpl) {
      const books = store.listBooks();
      books.forEach((book) => printProductDetails(book));
    } else if (store instanceof ClothingStoreImpl) {
      const clothingItems = store.listClothing();
      clothingItems.forEach((clothing) => printProductDetails(clothing));
    }
  }

  // Sample usage
  const book1 = new Book("Book 1", 25, 100);
  const book2 = new Book("Book 2", 30, 50);
  const clothing1 = new Clothing("T-Shirt", 15, 200);

  const bookStore = new BookStoreImpl([book1, book2]);
  const clothingStore = new ClothingStoreImpl([clothing1]);

  // Open/Closed Principle (OCP) - using the extended DiscountedProduct class
  const discountedBook = new DiscountedProduct(book1, 0.2);

  // Liskov Substitution Principle (LSP) - using the subclass DiscountedProduct
  printProductDetails(discountedBook);

  // Dependency Inversion Principle (DIP) - using abstractions
  printStoreItems(bookStore);
  printStoreItems(clothingStore);


}