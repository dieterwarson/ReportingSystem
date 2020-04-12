import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import Defect from "./defect";

@Table
export default class CategoryDefect extends Model<CategoryDefect> {
  @Column
  technicalId!: number;
  
  @Column
  defectId!: number;
}

/* CategoryDefect.hasMany(Defect, {
  sourceKey: "technicalId",
  foreignKey: "defectId",
  as: "defects",
}); */
