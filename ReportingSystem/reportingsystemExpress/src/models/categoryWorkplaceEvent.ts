import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import WorkplaceEvent from './workplaceEvent';

@Table
export default class CategoryWorkplaceEvent extends Model<CategoryWorkplaceEvent> {
  @Column
  administrativeId!: number;

  @Column
  workplaceEventId!: number;
}

/* CategoryWorkplaceEvent.hasMany(WorkplaceEvent, {
  sourceKey: "administrativeId",
  foreignKey: "workplaceEventId",
  as: "workplaceEvents",
}); */
