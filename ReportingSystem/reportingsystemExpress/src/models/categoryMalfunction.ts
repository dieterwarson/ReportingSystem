import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import  Malfunction from "./malfunction";

@Table
export default class CategoryMalfunction extends Model<CategoryMalfunction> {
  @Column
  technicalId!: number;

  @Column
  malfunctionId!: number;
}


/* CategoryMalfunction.hasMany(Malfunction, {
  sourceKey: "technicalId",
  foreignKey: "malfunctionId",
  as: "malfunctions",
});
 */