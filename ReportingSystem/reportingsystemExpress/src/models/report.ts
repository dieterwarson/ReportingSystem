import {Table, Column, Model, Index, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import User from './user'

@Table
export default class Report extends Model<Report> {
  @Index
  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column
  date!: Date;
  @Column
  temporary!: boolean;
}
