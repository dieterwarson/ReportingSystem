import { Table, Column, Model, Index, ForeignKey, BelongsTo, HasMany, HasOne, } from 'sequelize-typescript';
import User from './user';
import Technical from './technical'
import Operational from './operational'
import Administrative from './administrative'

@Table
export default class Report extends Model<Report> {
  @Index

  @Column
  date!: Date;
  @Column
  temporary!: boolean;

  @HasOne(() => Technical)
  technical!: Technical

  @HasOne(() => Operational)
  operational!: Operational

  @HasOne(() => Administrative)
  administrative!: Administrative
  
}
