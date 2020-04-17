import {Table, Column, Model, Index, ForeignKey, HasMany} from 'sequelize-typescript';
import DefectSubtype from "./defectSubtype";

@Table
export default class DefectType extends Model<DefectType> {
  @Index

  @ForeignKey(() => DefectSubtype)
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