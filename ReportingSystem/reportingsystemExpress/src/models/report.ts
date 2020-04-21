import { Table, Column, Model, Index, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import User from './user';

@Table
export default class Report extends Model<Report> {
  @Index
    
  @ForeignKey(() => User)
  @Column
  authorId!: number;
  @Column
  date!: Date;
  @Column
  temporary!: boolean;

  @BelongsTo(() => User)
  user!: User;
}
