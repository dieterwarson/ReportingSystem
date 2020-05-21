import { Table, Column, Model, Index, HasOne } from 'sequelize-typescript';
import Technical from './technical';
import Operational from './operational';
import Administrative from './administrative';

@Table
export default class Report extends Model<Report> {
  @Index
    
  @Column
  date!: Date;

  @Column
  temporary!: boolean;

  @Column
  nightShift!: boolean;

  @HasOne(() => Technical)
  technical!: Technical;

  @HasOne(() => Operational)
  operational!: Operational;

  @HasOne(() => Administrative)
  administrative!: Administrative;
}
