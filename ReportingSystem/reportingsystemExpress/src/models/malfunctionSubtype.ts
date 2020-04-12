import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class MalfunctionSubtype extends Model<MalfunctionSubtype> {
  @Column
  malfunctionSubtypeId!: number;
  @Column
  typeName!: string;
  @Column
  description!: string;
}
