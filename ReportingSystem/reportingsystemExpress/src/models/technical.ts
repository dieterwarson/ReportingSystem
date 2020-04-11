import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { CategoryMalfunction } from "./categoryMalfunction";
import { CategoryDefect } from "./categoryDefect";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Technical extends Model {
  public reportId!: number;
  public malfunction!: CategoryMalfunction;
  public defect!: CategoryDefect;
}

Technical.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    malfunction: {
      type: CategoryMalfunction, // weet nog niet hoe custom class als DataType kan
      allowNull: false,
    },
    defect: {
      type: CategoryDefect,
      allowNull: false,
    },
  },
  {
    modelName: "technical",
    sequelize: sequelize,
  }
);
