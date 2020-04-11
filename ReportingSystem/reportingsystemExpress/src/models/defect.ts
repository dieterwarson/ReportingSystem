import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { DefectType } from "./defectType";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Defect extends Model {
  public defectId!: number;
  public type!: DefectType;
  public description!: string;
  public monitoring!: boolean;
  public date!: Date;
}

Defect.init(
  {
    defectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DefectType, // weet nog niet hoe custom class als DataType kan
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
  },
  {
    modelName: "defect",
    sequelize: sequelize,
  }
);
