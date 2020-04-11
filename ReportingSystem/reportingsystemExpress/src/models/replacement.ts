import { Sequelize, Model, DataTypes, TINYINT } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class Replacement extends Model {
  public replacementId!: number;
  public absentee!: string;
  public substitute!: string;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
}

Replacement.init(
  {
    replacementId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    absentee: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    substitute: {
      type: DataTypes.STRING(128),
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
    shift: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    modelName: "replacement",
    sequelize: sequelize,
  }
);
