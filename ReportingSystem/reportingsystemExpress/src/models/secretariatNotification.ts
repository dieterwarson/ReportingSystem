import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class SecretariatNotification extends Model<SecretariatNotification> {
  @Index
    
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  shift!: boolean;
  @Column
  description!: string;
}
