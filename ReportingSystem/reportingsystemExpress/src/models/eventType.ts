import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import OperationalEvent from './operationalEvent';
import OperationalType from './operationalType';
import OperationalSubtype from './operationalSubtype';

@Table
export default class EventType extends Model<EventType> {
  @Index
  
  @ForeignKey(() => OperationalEvent)
  @Column
  operationalEventId!: number;

  @BelongsTo(() => OperationalEvent)
  operationalEvent!: OperationalEvent;

  @HasMany(() => OperationalType)
  operationalTypes!: OperationalType[];

  @HasMany(() => OperationalSubtype)
  operationalSubtypes!: OperationalSubtype[];
}
