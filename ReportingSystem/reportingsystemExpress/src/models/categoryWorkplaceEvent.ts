import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import WorkplaceEvent from './workplaceEvent';

@Table
export default class CategoryWorkplaceEvent extends Model<CategoryWorkplaceEvent> {
  @Index
    
  @ForeignKey(() => WorkplaceEvent)
  @Column
  workplaceEventId!: number;
}
