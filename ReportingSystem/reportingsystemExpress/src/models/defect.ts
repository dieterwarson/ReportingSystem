import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Defect extends Model {
  public defectId!: number;
  public defectTypeId!: number;
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
    defectTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
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
