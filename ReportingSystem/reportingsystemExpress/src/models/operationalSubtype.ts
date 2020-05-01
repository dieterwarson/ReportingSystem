import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import OperationalType from './operationalType';

@Table
export default class OperationalSubtype extends Model<OperationalSubtype> {
  @Index

  @ForeignKey(() => OperationalType)
  @Column
  operationalTypeId!: number;

  @BelongsTo(() => OperationalType)
  operationalType!: OperationalType;
    
  @Column
  typeName!: string;

  @Column
  description!: string;
}
