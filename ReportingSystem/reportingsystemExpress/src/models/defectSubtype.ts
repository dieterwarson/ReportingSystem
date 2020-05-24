import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import DefectType from './defectType';
import Defect from './defect';

@Table
export default class DefectSubtype extends Model<DefectSubtype> {
  @Index
    
  @ForeignKey(() => DefectType)
  @Column
  defectTypeId!: number;

  @BelongsTo(() => DefectType)
  defectType!: DefectType;

  @Column
  typeName!: string;

  @Column
  description!: string;

  @HasMany(() => Defect)
  malfunctions!: Defect[];
}
