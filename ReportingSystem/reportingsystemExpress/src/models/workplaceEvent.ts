import { Table, Column, Model, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import WorkplaceType from './workplaceType';
import Administrative from './administrative'
import User from './user'

@Table
export default class WorkplaceEvent extends Model<WorkplaceEvent> {
  @Index

  @ForeignKey(() => Administrative)
  @Column
  administrativeId!: number;

  @BelongsTo(() => Administrative)
  administrative!: Administrative

  @ForeignKey(() => User)
  @Column
  authorId!: number;
  @BelongsTo(() => User)
  user!: User;
    
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
