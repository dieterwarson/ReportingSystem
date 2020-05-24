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
export default class SecretariatNotification extends Model<SecretariatNotification> {
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
  description!: string;

  @Column
  monitoring!: boolean;
  
  @Column
  date!: Date;
}
