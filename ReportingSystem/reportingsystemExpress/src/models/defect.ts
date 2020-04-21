import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import DefectType from './defectType';

@Table
export default class Defect extends Model<Defect> {
  @Index
    
  @ForeignKey(() => DefectType)
  @Column
  defectTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
}
