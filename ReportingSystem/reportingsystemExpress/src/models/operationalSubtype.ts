import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import OperationalType from './operationalType';
import EventType from './eventType';

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

  @HasMany(() => EventType)
  eventTypes!: EventType[];
}
