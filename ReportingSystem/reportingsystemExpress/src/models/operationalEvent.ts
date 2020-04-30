import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Operational from './operational';
import User from './user';
import EventType from './eventType';

@Table
export default class OperationalEvent extends Model<OperationalEvent> {
  @Index
    
  @Column
  operationalTypeId!: number;

  @Column
  monitoring!: boolean;

  @Column
  signaling!: string;

  @Column
  plNumber!: string;

  @Column
  description!: string;

  @Column
  location!: string;

  @Column
  unit!: string;

  @Column
  date!: Date;

  @ForeignKey(() => Operational)
  @Column
  operationalId!: number;

  @BelongsTo(() => Operational)
  operational!: Operational;

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => EventType)
  eventTypes!: EventType[];
}
