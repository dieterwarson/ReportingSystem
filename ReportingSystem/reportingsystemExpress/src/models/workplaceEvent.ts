import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import WorkplaceType from './workplaceType';

@Table
export default class WorkplaceEvent extends Model<WorkplaceEvent> {
  @Index
  @Column
  workplaceTypeId!: number;
  @Column
  absentee!: string;
  @Column
  substitute!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  shift!: boolean;
  @Column
  description!: string;
}

