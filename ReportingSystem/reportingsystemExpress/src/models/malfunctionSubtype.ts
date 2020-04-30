import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import MalfunctionType from './malfunctionType';

@Table
export default class MalfunctionSubtype extends Model<MalfunctionSubtype> {
  @Index
    
  @Column
  typeName!: string;

  @Column
  description!: string;

  @ForeignKey(() => MalfunctionType)
  @Column
  malfunctionTypeId!: number;

  @BelongsTo(() => MalfunctionType)
  malfunctionType!: MalfunctionType;
}
