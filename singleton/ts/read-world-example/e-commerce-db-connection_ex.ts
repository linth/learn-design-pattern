/**
 * Singleton design pattern with Typescript for real-world scenario.
 * 
 * 常見的e-commerce平台的 database connection.
 * TODO: 此範例不齊全，需補強。
 * 
 * An complex example of using the Singleton pattern in a real-world scenario:
 * Suppose you are building a large-scale e-commerce platform that has multiple services that 
 * need to interact with a single database. The database connection is a shared resource that 
 * needs to be managed carefully to prevent issues like resource contention, race conditions, or inconsistent data.
 * To implement this using the Singleton pattern in TypeScript, you can create a class called 
 * DatabaseConnection with a private constructor, a private static instance variable, and a public 
 * static method to retrieve the single instance of the class.
 * 
 */
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor(private host: string, private port: number, private database: string, private username: string, private password: string) {
    // 初始化 database connection

    // Initialize database connection
    // this.connection = createConnection({
    //   host,
    //   port,
    //   database,
    //   username,
    //   password
    // });

    // this.connection = {
    //   host: 'www.google.com',
    //   port: 33,
    //   database: 'postgres',
    //   username: 'george',
    //   password: '12345',
    // }

    // this.setConnection();
  }

  // public setConnection(): any {
  //   this.connection = {
  //     host: 'www.google.com',
  //     port: 33,
  //     database: 'postgres',
  //     username: 'george',
  //     password: '12345',
  //   }

  //   return this.connection;
  // }

  public static getInstance(): DatabaseConnection {

    if (!DatabaseConnection.instance) {
      // 當沒有 database connection instance時候，設定相關參數。
      
      // Get database configuration from environment variables or configuration files
      // const host = process.env.DB_HOST || 'localhost';
      // const port = parseInt(process.env.DB_PORT || '3306');
      // const database = process.env.DB_DATABASE || 'mydb';
      // const username = process.env.DB_USERNAME || 'root';
      // const password = process.env.DB_PASSWORD || '';

      // DatabaseConnection.instance = new DatabaseConnection(host, port, database, username, password);
    }

    return DatabaseConnection.instance;
  }

  public getConnection(): any {
    return this.connection;
  }
}


{
  const db = DatabaseConnection.getInstance();  
  // const connection = db.getConnection();
  // Use the connection to execute database queries
}