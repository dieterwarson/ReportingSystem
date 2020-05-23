import { Table, Column, Model, Index, HasMany } from 'sequelize-typescript';
import OperationalSubtype from './operationalSubtype';
import EventType from './eventType';

@Table
export default class OperationalType extends Model<OperationalType> {
  @Index

  @Column
  typeName!: string;

  @HasMany(() => EventType)
  eventTypes!: EventType[];

  @HasMany(() => OperationalSubtype)
  operationalSubtypes!: OperationalSubtype[];
}
