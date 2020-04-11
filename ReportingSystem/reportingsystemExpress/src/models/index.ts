import { Sequelize } from "sequelize";
import { setupConnection } from "../config/config";
import { Report } from "./report"


export class Database{
  config: setupConnection = new setupConnection();
  sequelize: Sequelize = new Sequelize(this.config.getDatabase());
  report: Report = new Report

  constructor() {
    this.sequelize.sync()
  }

  testConnection(){
    try {
      this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

}