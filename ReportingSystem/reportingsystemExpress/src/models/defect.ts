import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import DefectType from "./defectType";

@Table
export default class Defect extends Model<Defect> {
  @Index
  @Column
  defectTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
}
