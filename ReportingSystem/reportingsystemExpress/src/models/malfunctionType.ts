import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import MalfunctionSubtype from "./malfunctionSubtype";

@Table
export default class MalfunctionType extends Model<MalfunctionType> {
  @Column
  malfunctionTypeId!: number;
  @Column
  malfunctionSubtypeId!: number;
  @Column
  typeName!: string;
}

/* MalfunctionType.hasMany(MalfunctionSubtype, {
  sourceKey: "malfunctionTypeId",
  foreignKey: "malfunctionSubtypeId",
  as: "malfunctionSubtype",
}); */
