/**
 * Factory design pattern for real-world example.
 *  - 程式語言的物件建構器
 *  - 檔案系統的檔案類別
 *  - 資料庫的資料連線類別
 *  - 物件導向程式設計的抽象工廠
 *  - 面向對象程式設計的單例模式
 * 
 * 
 */

// 實例1: 程式語言的物件建構器
{
  class MyObject {
    constructor(public readonly name: string) {}
  }

  const myObject = new MyObject('My Object');
  console.log(myObject.name); // My Object 
}



// 實例2: 檔案系統的檔案類別
{
  class MyFile {
    constructor(public readonly path: string) {}

    read() {
      // read the content of file.
    }

    write(constent: string) {
      // write the content of file.
    }
  }

  const myFile = new MyFile('My file.txt');
  myFile.read(); // read file content.
  myFile.write('hello world.'); // write file content.
  console.log(myFile);  // MyFile { path: 'My file.txt' }
}



// 實例3: 資料庫的資料連線類別
{
  class MyConnection {
    constructor(public readonly url: string, public readonly username: string, public readonly password: string) {}
    
    connect() {
      // 建立資料連線
    }

    disconnect() {
      // 關閉資料連線
    }
  }

  const myConnection = new MyConnection('mysql://localhost:3306/mydatabase', 'username', 'password');
  myConnection.connect(); // 建立資料連線
  myConnection.disconnect(); // 關閉資料連線
}



// 實例4: 物件導向程式設計的抽象工廠
{
  interface MyObject {
    name: string;
  }

  class MyObject1 implements MyObject {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class MyObject2 implements MyObject {
    name: string;
    
    constructor(name: string) {
      this.name = name;
    }
  }

  class MyObjectFactory {
    public static create(name: string): MyObject {
      switch(name) {
        case 'MyObject1':
          return new MyObject1(name);

        case 'MyObject2':
          return new MyObject2(name);
        
        default:
          throw new Error('Unknow object type');
      }
    }
  }

  const myObject1 = MyObjectFactory.create("MyObject1");
  const myObject2 = MyObjectFactory.create("MyObject2");
  console.log(myObject1.name); // 輸出 "MyObject1"
  console.log(myObject2.name); // 輸出 "MyObject2"
}


// 實例5: 面向對象程式設計的單例模式
{
  class MySingleton {
    private static readonly instance: MySingleton = new MySingleton();

    private constructor() {}

    public static getInstance(): MySingleton {
      return MySingleton.instance;
    }
  }

  const mySingleton = MySingleton.getInstance();
  console.log(mySingleton === MySingleton.getInstance()); // true.  
}


