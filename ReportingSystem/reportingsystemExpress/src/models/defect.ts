import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import DefectType from "./defectType";

@Table
export default class Defect extends Model<Defect> {
  @Column
  defectId!: number;
  @Column
  defectTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
}
