import {Table, Column, Model, Index, ForeignKey, HasMany} from 'sequelize-typescript';
import MalfunctionSubtype from "./malfunctionSubtype";

@Table
export default class MalfunctionType extends Model<MalfunctionType> {
  @Index

  @ForeignKey(() => MalfunctionSubtype)
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
