/**
 * proxy design pattern for real-world example.
 *  - Virtual Proxy for Heavy Object Initialization
 *  - 
 * 
 * 
 * Proxy Design Pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. 
 * It allows you to add an extra layer of indirection to protect the real object from unnecessary operations or to perform additional actions before or after accessing the real object.
 * 
 * 
 */

// 實際案例1: Virtual Proxy for Heavy Object Initialization.
{
  interface IImage {
    display(): void;
  }
  
  // real image.
  class RealImage implements IImage {
    private filename: string;
  
    constructor(filename: string) {
      this.filename = filename;
      this.loadFromDisk();
    }
  
    private loadFromDisk(): void {
      console.log(`Loading ${this.filename} from disk.`);
    }
  
    display(): void {
      console.log(`Displaying ${this.filename}.`);
    }
  }
  
  // image proxy. 使用proxy class來進行某class代理存取動作。
  class ImageProxy implements IImage {
    private realImage: RealImage | null = null;
    private filename: string;
  
    constructor(filename: string) {
      this.filename = filename;
    }
  
    display(): void {
      if (!this.realImage) {
        this.realImage = new RealImage(this.filename);
      }
      this.realImage.display();
    }
  }
  
  // Usage
  const image1 = new ImageProxy("image1.jpg");
  const image2 = new ImageProxy("image2.jpg");
  
  // The RealImage is only loaded when `display()` is called
  image1.display(); // Output: Loading image1.jpg from disk. \n Displaying image1.jpg.
  image1.display(); // Output: Displaying image1.jpg.
  
  image2.display();
  image2.display(); 
}