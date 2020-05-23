import { Table, Column, Model, Index, HasMany } from 'sequelize-typescript';
import MalfunctionSubtype from './malfunctionSubtype';
import Malfunction from './malfunction';

@Table
export default class MalfunctionType extends Model<MalfunctionType> {
  @Index

  @Column
  typeName!: string;

  @HasMany(() => Malfunction)
  malfunctions!: Malfunction[];

  @HasMany(() => MalfunctionSubtype)
  malfunctionSubtypes!: MalfunctionSubtype[];
}  
