import { Table, Column, Model, Index, HasMany } from 'sequelize-typescript';
import DefectSubtype from './defectSubtype';
import Defect from './defect';

@Table
export default class DefectType extends Model<DefectType> {
  @Index
    
  @HasMany(() => Defect)
  defects!: Defect[];

  @HasMany(() => DefectSubtype)
  defectSubtypes!: DefectSubtype[];

  @Column
  typeName!: string;
}
