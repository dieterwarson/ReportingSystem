import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import  Malfunction from "./malfunction";

@Table
export default class CategoryMalfunction extends Model<CategoryMalfunction> {
  @Index

  @Column
  malfunctionId!: number;
}


/* CategoryMalfunction.hasMany(Malfunction, {
  sourceKey: "technicalId",
  foreignKey: "malfunctionId",
  as: "malfunctions",
});
 */