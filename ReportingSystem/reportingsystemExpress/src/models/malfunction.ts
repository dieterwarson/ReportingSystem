import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import MalfunctionType from './malfunctionType';

@Table
export default class Malfunction extends Model<Malfunction> {
  @Index
    
  @ForeignKey(() => MalfunctionType)
  @Column
  malfunctionTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  duration!: number;
}
