import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { OperationalEvent } from "./operationalEvent";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategoryOperational extends Model {
  public reportId!: number;
  public operationalEventId!: number;
}

CategoryOperational.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    operationalEventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categoryOperational",
    sequelize: sequelize,
  }
);

CategoryOperational.hasMany(OperationalEvent, {
  sourceKey: "reportId",
  foreignKey: "operationalEventId",
  as: "operationalEvents",
});
