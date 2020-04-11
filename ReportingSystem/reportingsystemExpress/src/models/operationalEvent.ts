import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class OperationalEvent extends Model {
  public operationalEventId!: number;
  public operationalTypeId!: number;
  public signaling!: string;
  public plNumber!: string;
  public eventDescription!: string;
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
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    plNumber: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    eventDescription: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    location: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    unit: {
      type: new DataTypes.STRING(128),
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
