import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import SecretariatNotification from './secretariatNotification';

@Table
export default class CategorySecretariatNotification extends Model<CategorySecretariatNotification> {
  @Index
    
  @ForeignKey(() => SecretariatNotification)
  @Column
  secretariatNotificationId!: number;
}
