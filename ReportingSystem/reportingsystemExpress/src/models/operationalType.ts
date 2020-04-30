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
    
  @Column
  typeName!: string;

  @ForeignKey(() => EventType)
  @Column
  eventTypeId!: number;

  @BelongsTo(() => EventType)
  eventType!: EventType;

  @HasMany(() => OperationalSubtype)
  operationalSubtypes!: OperationalSubtype[];
}
