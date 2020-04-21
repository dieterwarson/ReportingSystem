import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import WorkplaceType from './workplaceType';

@Table
export default class WorkplaceEvent extends Model<WorkplaceEvent> {
  @Index
    
  @ForeignKey(() => WorkplaceType)
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
