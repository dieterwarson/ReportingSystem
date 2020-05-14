import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
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

  @ForeignKey(() => EventType)
  @Column
  eventTypeId!: number;

  @BelongsTo(() => EventType)
  eventType!: EventType;
    
  @Column
  typeName!: string;

  @Column
  description!: string;
}
