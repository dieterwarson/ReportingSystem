import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class DefectSubtype extends Model {
  public defectSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}

DefectSubtype.init(
  {
    defectSubtypeId: {
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
    modelName: "defectSubtype",
    sequelize: sequelize,
  }
);
