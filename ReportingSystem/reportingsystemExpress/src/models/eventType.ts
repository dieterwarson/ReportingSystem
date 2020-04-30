import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Report from './report';
import OperationalEvent from './operationalEvent';
import OperationalType from './operationalType';
import OperationalSubtype from './operationalSubtype';

@Table
export default class EventType extends Model<EventType> {
  @Index
    
  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @ForeignKey(() => OperationalEvent)
  @Column
  operationalEventId!: number;

  @BelongsTo(() => OperationalEvent)
  operationalEvent!: OperationalEvent;

  @ForeignKey(() => OperationalType)
  @Column
  operationalTypeId!: number;

  @BelongsTo(() => OperationalType)
  operationalType!: OperationalType;

  @ForeignKey(() => OperationalSubtype)
  @Column
  operationalSubtypeId!: number;

  @BelongsTo(() => OperationalSubtype)
  operationalSubtype!: OperationalSubtype;

  @HasMany(() => OperationalType)
  operationalTypes!: OperationalType[];
}
