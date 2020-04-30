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
    
  @Column
  description!: string;

  @Column
  monitoring!: boolean;

  @Column
  date!: Date;

  @Column
  duration!: number;

  @ForeignKey(() => Technical)
  @Column
  technicalId!: number;

  @BelongsTo(() => Technical)
  technical!: Technical;

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => MalfunctionType)
  @Column
  malfunctionTypeId!: number;

  @BelongsTo(() => MalfunctionType)
  malfunctionType!: MalfunctionType;
}
