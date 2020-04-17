import {Table, Column, Model, Index,ForeignKey, HasMany} from 'sequelize-typescript';
import WorkplaceEvent from './workplaceEvent';

@Table
export default class CategoryWorkplaceEvent extends Model<CategoryWorkplaceEvent> {
  @Index

  @ForeignKey(() => WorkplaceEvent)
  @Column
  workplaceEventId!: number;
}

/* CategoryWorkplaceEvent.hasMany(WorkplaceEvent, {
  sourceKey: "administrativeId",
  foreignKey: "workplaceEventId",
  as: "workplaceEvents",
}); */
