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

@Table
export default class EventType extends Model<EventType> {
  @Index
    
  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @BelongsTo(() => Report)
  report!: Report;

  @ForeignKey(() => OperationalEvent)
  @Column
  operationalEventId!: number;

  @BelongsTo(() => OperationalEvent)
  operationalEvent!: OperationalEvent;

  @HasMany(() => OperationalType)
  operationalTypes!: OperationalType[];
}
