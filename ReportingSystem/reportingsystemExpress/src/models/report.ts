import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class Report extends Model<Report> {
  @Index
  @Column
  authorId!: number;
  @Column
  date!: Date;
  @Column
  temporary!: boolean;
}
