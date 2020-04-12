import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import OperationalSubtype from "./operationalSubtype";

@Table
export default class OperationalType extends Model<OperationalType> {
  @Index
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
