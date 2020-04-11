import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { MalfunctionSubtype } from "./malfunctionSubtype";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class MalfunctionType extends Model {
  public malfunctionTypeId!: number;
  public malfunctionSubtypeId!: number;
  public typeName!: string;
}

MalfunctionType.init(
  {
    malfunctionTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    malfunctionSubtypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    typeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    modelName: "malfunctionType",
    sequelize: sequelize,
  }
);

MalfunctionType.hasMany(MalfunctionSubtype, {
  sourceKey: "malfunctionTypeId",
  foreignKey: "malfunctionSubtypeId",
  as: "malfunctionSubtype",
});
