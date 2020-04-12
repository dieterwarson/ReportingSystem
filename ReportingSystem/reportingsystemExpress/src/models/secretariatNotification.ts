import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import DefectType from "./defectType";

@Table
export default class SecretariatNotification extends Model<SecretariatNotification> {
  @Column
  secretariatNotificationId!: number;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  shift!: boolean;
  @Column
  description!: string;
}
