import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import DefectSubtype from "./defectSubtype";

@Table
export default class DefectType extends Model<DefectType> {
  @Column
  defectTypeId!: number;
  @Column
  defectSubtypeId!: number;
  @Column
  typeName!: string;
}

/* DefectType.hasMany(DefectSubtype, {
  sourceKey: "defectTypeId",
  foreignKey: "defectSubtypeId",
  as: "defectSubtype",
});
 */