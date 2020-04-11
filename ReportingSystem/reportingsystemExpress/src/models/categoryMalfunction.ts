import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { Malfunction } from "./malfunction";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategoryMalfunction extends Model {
  public reportId!: number;
  public malfunctionId!: number;
}

CategoryMalfunction.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    malfunctionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categoryMalfunction",
    sequelize: sequelize,
  }
);

CategoryMalfunction.hasMany(Malfunction, {
  sourceKey: "reportId",
  foreignKey: "malfunctionId",
  as: "malfunctions",
});
