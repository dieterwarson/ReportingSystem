import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import MalfunctionType from './malfunctionType';
import Technical from './technical';
import User from './user';

@Table
export default class Malfunction extends Model<Malfunction> {
  @Index
    
  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Technical)
  @Column
  technicalId!: number;

  @BelongsTo(() => Technical)
  technical!: Technical;

  @ForeignKey(() => MalfunctionType)
  @Column
  malfunctionTypeId!: number;

  @BelongsTo(() => MalfunctionType)
  malfunctionType!: MalfunctionType;

  @Column
  description!: string;

  @Column
  monitoring!: boolean;

  @Column
  date!: Date;

  @Column
  duration!: string;
}
