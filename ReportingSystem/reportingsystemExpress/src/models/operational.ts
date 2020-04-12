import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class Operational extends Model<Operational> {
  @Column
  reportId!: number;
  @Column
  operationalId!: number;
}
