import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import DefectSubtype from "./defectSubtype";

@Table
export default class DefectType extends Model<DefectType> {
  @Index
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