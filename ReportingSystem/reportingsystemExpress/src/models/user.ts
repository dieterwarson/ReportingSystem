import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Index
  @Column
  username!: string;
  @Column
  password!: string;
  @Column
  accessRights!: number;
}

// TODO provide safe way to save user
