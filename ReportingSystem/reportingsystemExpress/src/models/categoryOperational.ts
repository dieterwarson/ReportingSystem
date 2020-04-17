import {Table, Column, Model, Index, ForeignKey, HasMany} from 'sequelize-typescript';
import OperationalEvent from "./operationalEvent";

@Table
export default class CategoryOperational extends Model<CategoryOperational> {
  @Index

  @ForeignKey(() => OperationalEvent)
  @Column
  operationalEventId!: number;
}


/* CategoryOperational.hasMany(OperationalEvent, {
  sourceKey: "operationalId",
  foreignKey: "operationalEventId",
  as: "operationalEvents",
}); */
