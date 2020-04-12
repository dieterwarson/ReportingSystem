import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import SecretariatNotification from "./secretariatNotification";

@Table
export default class CategorySecretariatNotification extends Model<CategorySecretariatNotification> {
  @Index

  @Column
  secretariatNotificationId!: number;
}


/* CategorySecretariatNotification.hasMany(SecretariatNotification, {
  sourceKey: "administrativeId",
  foreignKey: "secretariatNotificationId",
  as: "secretariatNotifications",
}); */
