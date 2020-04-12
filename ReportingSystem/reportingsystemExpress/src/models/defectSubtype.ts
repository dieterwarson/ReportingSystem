import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class DefectSubtype extends Model<DefectSubtype> {
  @Column
  defectSubtypeId!: number;
  @Column
  typeName!: string;
  @Column
  description!: string;
}
