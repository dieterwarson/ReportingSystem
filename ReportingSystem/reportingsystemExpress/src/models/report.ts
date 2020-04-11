import { Sequelize, Model, DataTypes, TINYINT } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Report extends Model {
  public reportId!: number;
  public authorId!: number;
  public date!: Date;
  public temporary!: boolean;
}

Report.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    temporary: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    modelName: "report",
    sequelize: sequelize,
  }
);
