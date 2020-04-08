// needs to be changed to use .env file 
 
 export class setupConnection {
     username: string = "root"
     password: string = "mysqlroot"
     database: string = "reports"
     host: string = "0.0.0.0:3306"
     dialect: string = "mysql"
     getDatabase() {
         return this.dialect + '://' + this.username + ':' + this.password + '@' + this.host + '/' + this.database;
     }

}