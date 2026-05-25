/**
 * SOLID 原則 - 商品系統綜合範例
 * 同一個案例展示五個 SOLID 原則的應用。
 */

{
  // ---------- SRP：每個類別僅負責自己的資料 ----------
  interface Product {
    getName(): string;
    getPrice(): number;
    getStock(): number;
  }

  // Book 僅負責管理書籍資料
  class Book implements Product {
    constructor(
      private name: string,
      private price: number,
      private stock: number,
    ) {}

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

  // Clothing 僅負責管理衣物資料
  class Clothing implements Product {
    constructor(
      private name: string,
      private price: number,
      private stock: number,
    ) {}

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

  // ---------- OCP：新增折扣功能時不修改既有 Product 類別 ----------
  class DiscountedProduct implements Product {
    constructor(
      private product: Product,
      private discount: number,
    ) {}

    getName(): string {
      return `${this.product.getName()} (折扣)`;
    }

    getPrice(): number {
      return this.product.getPrice() * (1 - this.discount);
    }

    getStock(): number {
      return this.product.getStock();
    }
  }

  // ---------- LSP：DiscountedProduct 可完全取代 Product ----------
  function printProductDetails(product: Product): void {
    console.log(`  名稱: ${product.getName()}`);
    console.log(`  價格: $${product.getPrice()}`);
    console.log(`  庫存: ${product.getStock()}`);
  }

  // ---------- ISP：將大型介面拆分為小型專用介面 ----------
  interface BookStore {
    listBooks(): Book[];
  }

  interface ClothingStore {
    listClothing(): Clothing[];
  }

  class BookStoreImpl implements BookStore {
    constructor(private books: Book[]) {}

    listBooks(): Book[] {
      return this.books;
    }
  }

  class ClothingStoreImpl implements ClothingStore {
    constructor(private clothingItems: Clothing[]) {}

    listClothing(): Clothing[] {
      return this.clothingItems;
    }
  }

  // ---------- DIP：高層函式依賴抽象介面而非具體實作 ----------
  function printStoreItems(store: BookStore | ClothingStore): void {
    if (store instanceof BookStoreImpl) {
      const books = store.listBooks();
      books.forEach((book) => printProductDetails(book));
    } else if (store instanceof ClothingStoreImpl) {
      const clothingItems = store.listClothing();
      clothingItems.forEach((clothing) => printProductDetails(clothing));
    }
  }

  // 使用範例
  const book1 = new Book('Book 1', 25, 100);
  const book2 = new Book('Book 2', 30, 50);
  const clothing1 = new Clothing('T-Shirt', 15, 200);

  const bookStore = new BookStoreImpl([book1, book2]);
  const clothingStore = new ClothingStoreImpl([clothing1]);

  // OCP：使用擴充的 DiscountedProduct，不修改 Book
  const discountedBook = new DiscountedProduct(book1, 0.2);

  // LSP：DiscountedProduct 可替代 Product 使用
  printProductDetails(discountedBook);

  // DIP：依賴抽象介面
  printStoreItems(bookStore);
  printStoreItems(clothingStore);
}