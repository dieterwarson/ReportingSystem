import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import MalfunctionType from './malfunctionType';
import Malfunction from './malfunction';

@Table
export default class MalfunctionSubtype extends Model<MalfunctionSubtype> {
  @Index

  @ForeignKey(() => MalfunctionType)
  @Column
  malfunctionTypeId!: number;

  @BelongsTo(() => MalfunctionType)
  malfunctionType!: MalfunctionType;

  @Column
  typeName!: string;

  @Column
  description!: string;

  @HasMany(() => Malfunction)
  malfunctions!: Malfunction[];
}
