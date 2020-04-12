import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class OperationalSubtype extends Model<OperationalSubtype> {
  @Column
  operationalSubtypeId!: number;
  @Column
  typeName!: string;
  @Column
  description!: string;
}

