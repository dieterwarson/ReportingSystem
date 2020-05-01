import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import OperationalSubtype from './operationalSubtype';
import EventType from './eventType';

@Table
export default class OperationalType extends Model<OperationalType> {
  @Index
  
  @ForeignKey(() => EventType)
  @Column
  eventTypeId!: number;

  @BelongsTo(() => EventType)
  eventType!: EventType;
  
  @Column
  typeName!: string;

  @HasMany(() => OperationalSubtype)
  operationalSubtypes!: OperationalSubtype[];
}
