import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class MalfunctionSubtype extends Model {
  public malfunctionSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}

MalfunctionSubtype.init(
  {
    malfunctionSubtypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    typeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "malfunctionSubtype",
    sequelize: sequelize,
  }
);
