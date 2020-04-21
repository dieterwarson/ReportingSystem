import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import Replacement from './replacement';

@Table
export default class CategoryReplacement extends Model<CategoryReplacement> {
  @Index
    
  @ForeignKey(() => Replacement)
  @Column
  replacementId!: number;
}
