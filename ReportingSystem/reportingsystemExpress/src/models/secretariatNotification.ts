import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { DefectType } from "./defectType";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class SecretariatNotification extends Model {
  public secretariatNotificationId!: number;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
  public description!: string;
}

SecretariatNotification.init(
  {
    secretariatNotificationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "secretariatNotification",
    sequelize: sequelize,
  }
);
