import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { OperationalSubtype } from "./operationalSubtype";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class OperationalType extends Model {
  public operationalTypeId!: number;
  public operationalSubtypeId!: number;
  public typeName!: string;
}

OperationalType.init(
  {
    operationalTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    operationalSubtypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    typeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    modelName: "operationalType",
    sequelize: sequelize,
  }
);

OperationalType.hasMany(OperationalSubtype, {
  sourceKey: "operationalTypeId",
  foreignKey: "operationalSubtypeId",
  as: "operationalSubtype",
});
