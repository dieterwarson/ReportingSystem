import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { SecretariatNotification } from "./secretariatNotification";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategorySecretariatNotification extends Model {
  public administrativeId!: number;
  public secretariatNotificationId!: number;
}

CategorySecretariatNotification.init(
  {
    administrativeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    secretariatNotificationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categorySecretariatNotification",
    sequelize: sequelize,
  }
);

CategorySecretariatNotification.hasMany(SecretariatNotification, {
  sourceKey: "administrativeId",
  foreignKey: "secretariatNotificationId",
  as: "secretariatNotifications",
});
