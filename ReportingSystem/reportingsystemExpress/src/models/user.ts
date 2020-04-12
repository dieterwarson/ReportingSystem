import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Column
  authorId!: number;
  @Column
  username!: string;
  @Column
  password!: string;
  @Column
  accessRights!: number;
}

// TODO provide safe way to save user
