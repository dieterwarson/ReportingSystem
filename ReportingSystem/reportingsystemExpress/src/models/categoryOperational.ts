import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import OperationalEvent from "./operationalEvent";

@Table
export default class CategoryOperational extends Model<CategoryOperational> {
  @Column
  operationalId!: number;

  @Column
  operationalEventId!: number;
}


/* CategoryOperational.hasMany(OperationalEvent, {
  sourceKey: "operationalId",
  foreignKey: "operationalEventId",
  as: "operationalEvents",
}); */
