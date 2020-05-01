import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import DefectType from './defectType';

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
}
