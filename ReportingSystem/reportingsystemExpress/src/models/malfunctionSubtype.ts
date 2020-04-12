import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class MalfunctionSubtype extends Model<MalfunctionSubtype> {
  @Index
  @Column
  typeName!: string;
  @Column
  description!: string;
}
