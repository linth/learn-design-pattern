/**
 * 案例 3: 數據庫連接池, database connection with singleton design pattern.
 * 
 * TODO: 需加強
 * 
 * 使用的library: postgresql-client
 *  - https://www.npmjs.com/package/postgresql-client
 */
// import { Connection } from "postgresql-client";
import { Client } from 'pg'

{
  

  // class Connection {
  //   constructor(private host: string, private port: number) {}

  //   connect(): void {
  //     console.log(`Connecting to ${this.host}:${this.port}`);
  //   }

  //   close(): void {
  //     console.log(`Closing connection to ${this.host}:${this.port}`);
  //   }
  // }


  // class DatabaseConnection {
  //   private static _instance: DatabaseConnection;
  //   private _connections: Array<Client> = [];
  //   private _maxConnections: number = 10;
  //   private _currentConnections: number = 0;

  //   private constructor() {}

  //   static getInstance(): DatabaseConnection {
  //     return this._instance || (this._instance = new DatabaseConnection());
  //   }

  //   async getConnection(): Promise<Client | null> {
  //     if (this._currentConnections < this._maxConnections) {
  //       const connection = await this.createConnection();
  //       if (connection) {
  //         this._connections.push(connection);
  //         this._currentConnections++;
  //         return connection;
  //       }
  //     }
  //     return null;
  //   }

  //   private async createConnection(): Promise<Client | null> {
  //     try {
  //       const client = new Client({
  //         user: 'username',
  //         host: 'localhost',
  //         database: 'dbname',
  //         password: 'password',
  //         port: 5432,
  //       });
  //       await client.connect();
  //       return client;
  //     } catch (error) {
  //       console.error('Error creating database connection:', error);
  //       return null;
  //     }
  //   }

  //   async releaseConnection(connection: Client): Promise<void> {
  //     try {
  //       await connection.end();
  //       const index = this._connections.indexOf(connection);
  //       if (index !== -1) {
  //         this._connections.slice(index, 1);
  //         this._currentConnections--;
  //       }
  //     } catch (error) {
  //       console.error('Error releasing database connection:', error);        
  //     }
  //   }
  // }

  // const client = new Client({
  //   user: 'postgres',
  //   host: 'localhost',
  //   database: 'postgres',
  //   password: '123456',
  //   port: 5432,
  // });
  
  // try {
  //   client.connect();
  // } catch {
  //   console.error('connection failure.');
  // }
}