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
import WorkplaceEvent from './workplaceEvent';
import SecretariatNotification from './secretariatNotification';

@Table
export default class Administrative extends Model<Administrative> {
  @Index

  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @BelongsTo(() => Report)
  report!: Report;

  @HasMany(() => WorkplaceEvent)
  workplaceEvents!: WorkplaceEvent[];

  @HasMany(() => SecretariatNotification)
  secretariatNotifications!: SecretariatNotification[];
}
