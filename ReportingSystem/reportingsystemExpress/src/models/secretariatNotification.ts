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
export default class SecretariatNotification extends Model<
  SecretariatNotification
> {
  @Index
  
  @Column
  monitoring!: boolean;
  
  @Column
  date!: Date;
  
  @Column
  shift!: boolean;
  
  @Column
  description!: string;
  
  @ForeignKey(() => Administrative)
  @Column
  administrativeId!: number;

  @BelongsTo(() => Administrative)
  administrative!: Administrative;

  @ForeignKey(() => User)
  @Column
  authorId!: number;
  
  @BelongsTo(() => User)
  user!: User;
}
