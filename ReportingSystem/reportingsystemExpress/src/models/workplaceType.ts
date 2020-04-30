import { Table, Column, Model, Index, HasMany } from 'sequelize-typescript';
import WorkplaceSubtype from './workplaceSubtype';
import WorkplaceEvent from './workplaceEvent';

@Table
export default class WorkplaceType extends Model<WorkplaceType> {
  @Index
    
  @Column
  typeName!: string;

  @HasMany(() => WorkplaceEvent)
  workplaceEvents!: WorkplaceEvent[];

  @HasMany(() => WorkplaceSubtype)
  sorkplaceSubtypes!: WorkplaceSubtype[];
}
