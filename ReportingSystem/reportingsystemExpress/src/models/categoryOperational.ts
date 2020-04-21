import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import OperationalEvent from './operationalEvent';

@Table
export default class CategoryOperational extends Model<CategoryOperational> {
  @Index
    
  @ForeignKey(() => OperationalEvent)
  @Column
  operationalEventId!: number;
}
