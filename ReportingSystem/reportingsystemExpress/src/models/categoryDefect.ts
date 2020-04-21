import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import Defect from './defect';

@Table
export default class CategoryDefect extends Model<CategoryDefect> {
  @Index
    
  @ForeignKey(() => Defect)
  @Column
  defectId!: number;
}
