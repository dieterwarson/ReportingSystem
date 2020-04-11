import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class WorkplaceType extends Model {
  public workplaceTypeId!: number;
  public typeName!: string;
}

WorkplaceType.init(
  {
    workplaceTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    typeName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    modelName: "workplaceType",
    sequelize: sequelize,
  }
);