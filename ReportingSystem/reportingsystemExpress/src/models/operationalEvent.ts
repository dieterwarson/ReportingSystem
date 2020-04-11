import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class OperationalEvent extends Model {
  public operationalEventId!: number;
  public operationalTypeId!: number;
  public signaling!: string;
  public plNumber!: string;
  public description!: string;
  public location!: string;
  public unit!: string;
  public date!: Date;
}

OperationalEvent.init(
  {
    operationalEventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    operationalTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    signaling: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    plNumber: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "operationalEvent",
    sequelize: sequelize,
  }
);
