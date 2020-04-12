import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class Report extends Model<Report> {
  @Column
  reportId!: number;
  @Column
  authorId!: number;
  @Column
  date!: Date;
  @Column
  temporary!: boolean;
}
