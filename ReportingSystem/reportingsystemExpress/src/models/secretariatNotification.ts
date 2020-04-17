import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import DefectType from "./defectType";

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
