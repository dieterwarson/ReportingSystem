import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Administrative from './administrative';
import User from './user';

@Table
export default class Replacement extends Model<Replacement> {
  @Index
    
  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Administrative)
  @Column
  administrativeId!: number;

  @BelongsTo(() => Administrative)
  administrative!: Administrative;

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
}
