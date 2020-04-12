import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class Administrative extends Model<Administrative> {
  @Column
  reportId!: number;

  @Column
  administrativeId!: number;
}
