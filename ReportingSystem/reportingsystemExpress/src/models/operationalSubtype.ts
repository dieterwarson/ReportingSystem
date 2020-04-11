import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class OperationalSubtype extends Model {
  public operationalSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}

OperationalSubtype.init(
  {
    operationalSubtypeId: {
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
    modelName: "operationalSubtype",
    sequelize: sequelize,
  }
);
