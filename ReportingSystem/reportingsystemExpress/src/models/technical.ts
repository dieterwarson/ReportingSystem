import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class Technical extends Model<Technical> {
  @Column
  reportId!: number;
  @Column
  technicalId!: number;
}
