import { Table, Column, Model, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DefectType from './defectType';
import Technical from './technical'
import User from './user'

@Table
export default class Defect extends Model<Defect> {
  @Index

  @ForeignKey(() => Technical)
  @Column
  technicalId!: number;

  @BelongsTo(() => Technical)
  technical!: Technical

  @ForeignKey(() => User)
  @Column
  authorId!: number;
  @BelongsTo(() => User)
  user!: User;
    
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
