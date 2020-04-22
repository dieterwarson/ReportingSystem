import { Table, Column, Model, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Operational from './operational'
import User from './user'

@Table
export default class OperationalEvent extends Model<OperationalEvent> {
  @Index

  @ForeignKey(() => Operational)
  @Column
  operationalId!: number;

  @BelongsTo(() => Operational)
  operational!: Operational

  @ForeignKey(() => User)
  @Column
  authorId!: number;
  @BelongsTo(() => User)
  user!: User;
    
  @Column
  operationalTypeId!: number;
  @Column
  monitoring!: boolean;
  @Column
  signaling!: string;
  @Column
  plNumber!: string;
  @Column
  description!: string;
  @Column
  location!: string;
  @Column
  unit!: string;
  @Column
  date!: Date;
  @Column
  monitoring!: boolean;
}
