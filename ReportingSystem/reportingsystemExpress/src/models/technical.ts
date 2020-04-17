import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class Technical extends Model<Technical> {
  @Index
  @Column
  technicalId!: number;
}
