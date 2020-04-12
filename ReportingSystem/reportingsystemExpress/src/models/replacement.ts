import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class Replacement extends Model<Replacement> {
  @Column
  replacementId!: number;
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
