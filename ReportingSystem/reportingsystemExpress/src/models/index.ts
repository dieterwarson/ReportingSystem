import { Sequelize } from "sequelize";
import { setupConnection } from "../config/config";
import { Report } from "./report";

export class Database {
  config: setupConnection = new setupConnection();
  sequelize: Sequelize = new Sequelize(this.config.getDatabase());
  report!: Report;

  testConnection() {
    try {
      this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  makeObjects() {
    console.log("VOOR try ___report:" + this.report + "____");

    try {
      console.log("___report:" + this.report + "____");

      this.report = new Report();

      console.log("___report:" + this.report + "____");
    } catch (error) {
      console.log("ERROR START");
      console.log(error);
      console.log("ERROR END");
    }

    console.log("NA try ___report:" + this.report + "____");

    this.sequelize.sync();
  }
}
