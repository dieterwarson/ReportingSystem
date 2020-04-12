import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import SecretariatNotification from "./secretariatNotification";

@Table
export default class CategorySecretariatNotification extends Model<CategorySecretariatNotification> {
  @Column
  administrativeId!: number;

  @Column
  secretariatNotificationId!: number;
}


/* CategorySecretariatNotification.hasMany(SecretariatNotification, {
  sourceKey: "administrativeId",
  foreignKey: "secretariatNotificationId",
  as: "secretariatNotifications",
}); */
