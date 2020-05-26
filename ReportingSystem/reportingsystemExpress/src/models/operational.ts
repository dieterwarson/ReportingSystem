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

@Table
export default class Operational extends Model<Operational> {
  @Index

  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @BelongsTo(() => Report)
  report!: Report;

  @HasMany(() => OperationalEvent)
  operationalEvents!: OperationalEvent[];
}
