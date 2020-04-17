import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import Defect from "./defect";

@Table
export default class CategoryDefect extends Model<CategoryDefect> {
  @Index
  
  @Column
  defectId!: number;
}

/* CategoryDefect.hasMany(Defect, {
  sourceKey: "technicalId",
  foreignKey: "defectId",
  as: "defects",
}); */
