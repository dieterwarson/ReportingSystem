import {Table, Column, Model, Index, HasMany, ForeignKey} from 'sequelize-typescript';
import  Malfunction from "./malfunction";

@Table
export default class CategoryMalfunction extends Model<CategoryMalfunction> {
  @Index

  @ForeignKey(() => Malfunction)
  @Column
  malfunctionId!: number;
}


/* CategoryMalfunction.hasMany(Malfunction, {
  sourceKey: "technicalId",
  foreignKey: "malfunctionId",
  as: "malfunctions",
});
<<<<<<< HEAD
 */
=======
 */
>>>>>>> add-report
