import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Administrative extends Model {
  public reportId!: number;
  public absence!: boolean;
}

Administrative.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    absence: {
      type: DataTypes.TINYINT(), // BOOLEAN == TINYINT
      allowNull: false,
    },
  },
  {
    modelName: "administrative",
    sequelize: sequelize,
  }
);
