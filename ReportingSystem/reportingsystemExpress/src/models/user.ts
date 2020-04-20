import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import Report from './report'

@Table
export default class User extends Model<User> {
  @Index
  @Column
  username!: string;
  @Column
  password!: string;
  @Column
  accessRights!: number;

  @HasMany(() => Report)
  reports!: Report[]
}

// TODO provide safe way to save user
