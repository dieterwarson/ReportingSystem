import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class OperationalSubtype extends Model<OperationalSubtype> {
  @Index
  @Column
  typeName!: string;
  @Column
  description!: string;
}

