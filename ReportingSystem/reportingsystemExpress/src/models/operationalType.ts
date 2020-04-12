import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import OperationalSubtype from "./operationalSubtype";

@Table
export default class OperationalType extends Model<OperationalType> {
  @Column
  operationalTypeId!: number;
  @Column
  operationalSubtypeId!: number;
  @Column
  typeName!: string;
}

/* OperationalType.hasMany(OperationalSubtype, {
  sourceKey: "operationalTypeId",
  foreignKey: "operationalSubtypeId",
  as: "operationalSubtype",
}); */
