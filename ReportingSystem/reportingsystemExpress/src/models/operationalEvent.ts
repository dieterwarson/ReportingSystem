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

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;
    
  @ForeignKey(() => Operational)
  @Column
  operationalId!: number;

  @BelongsTo(() => Operational)
  operational!: Operational;
  
  @Column
  signaling!: string;
  
  @Column
  plNumber!: string;
  
  @Column
  description!: string;
  
  @Column
  monitoring!: boolean;

  @Column
  location!: string;
  
  @Column
  unit!: string;
  
  @Column
  date!: Date;

  @HasMany(() => EventType)
  eventTypes!: EventType[];
}
