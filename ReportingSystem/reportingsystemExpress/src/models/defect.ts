import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import DefectType from './defectType';
import Technical from './technical';
import User from './user';
import DefectSubtype from './defectSubtype';

@Table
export default class Defect extends Model<Defect> {
  @Index

  @ForeignKey(() => User)
  @Column
  authorId!: number;
  
  @BelongsTo(() => User)
  user!: User;
  
  @ForeignKey(() => Technical)
  @Column
  technicalId!: number;

  @BelongsTo(() => Technical)
  technical!: Technical;

  @ForeignKey(() => DefectType)
  @Column
  defectTypeId!: number;

  @BelongsTo(() => DefectType)
  defectType!: DefectType;

  @ForeignKey(() => DefectSubtype)
  @Column
  defectSubtypeId!: number;

  @BelongsTo(() => DefectSubtype)
  defectSubtype!: DefectSubtype;

  @Column
  description!: string;

  @Column
  monitoring!: boolean;

  @Column
  date!: Date;
}
