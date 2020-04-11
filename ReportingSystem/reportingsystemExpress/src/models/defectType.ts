import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { DefectSubtype } from "./defectSubtype";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class DefectType extends Model {
  public defectTypeId!: number;
  public defectSubtypeId!: number;
  public typeName!: string;
}

DefectType.init(
  {
    defectTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    defectSubtypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    typeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    modelName: "defectType",
    sequelize: sequelize,
  }
);

DefectType.hasMany(DefectSubtype, {
  sourceKey: "defectTypeId",
  foreignKey: "defectSubtypeId",
  as: "defectSubtype",
});
