import { Sequelize, Model, DataTypes } from "sequelize";
import { MalfunctionType } from "./malfunctionType";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Malfunction extends Model {
  public malfunctionId!: number;
  public type!: MalfunctionType;
  public description!: string;
  public monitoring!: boolean;
  public date!: Date;
  public duration!: number;
}

Malfunction.init(
  {
    malfunctionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: MalfunctionType, // weet nog niet hoe custom class als DataType kan
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    monitoring: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    modelName: "malfunction",
    sequelize: sequelize,
  }
);
