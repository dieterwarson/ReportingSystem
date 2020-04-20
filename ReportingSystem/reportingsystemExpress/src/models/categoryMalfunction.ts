import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import Malfunction from './malfunction';

@Table
export default class CategoryMalfunction extends Model<CategoryMalfunction> {
  @Index
    
  @ForeignKey(() => Malfunction)
  @Column
  malfunctionId!: number;
}
