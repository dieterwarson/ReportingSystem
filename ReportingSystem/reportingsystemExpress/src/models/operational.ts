import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class Operational extends Model<Operational> {
  @Index
  @Column
  operationalId!: number;
}
