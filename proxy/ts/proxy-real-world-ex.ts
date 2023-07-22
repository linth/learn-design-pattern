/**
 * proxy design pattern for real-world example.
 *  - Virtual Proxy for Heavy Object Initialization
 *  - Remote Proxy for Network Requests
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


// 實際案例2: Remote Proxy for Network Requests
// A remote proxy can be used to represent objects that reside in different address spaces, such as a remote server or a web service.
{
  interface IUser {
    getName(): Promise<string>;
  }
  
  // 遠端使用者
  class RemoteUser implements IUser {
    private userId: number;
  
    constructor(userId: number) {
      this.userId = userId;
    }
  
    async getName(): Promise<string> {
      // TODO: URL只是範例，執行會錯誤。
      // Simulate a network request to fetch the user name
      const response = await fetch(`https://www.google.com/users/${this.userId}`);
      const data = await response.json();
      return data.name;
    }
  }
  
  // 代理使用者
  class UserProxy implements IUser {
    private remoteUser: RemoteUser | null = null;
    private userId: number;
  
    constructor(userId: number) {
      this.userId = userId;
    }
  
    async getName(): Promise<string> {
      if (!this.remoteUser) {
        this.remoteUser = new RemoteUser(this.userId);
      }
      return this.remoteUser.getName();
    }
  }
  
  // Usage
  const user1 = new UserProxy(1);
  
  user1.getName().then((name) => {
    console.log(name); // Output: Name fetched from the server for user with ID 1
  });
  
  user1.getName().then((name) => {
    console.log(name); // Output: Name fetched from cache for user with ID 1
  });
  
}