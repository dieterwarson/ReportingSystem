import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class WorkplaceSubtype extends Model<WorkplaceSubtype> {
  @Index
  @Column
  typeName!: string;
  @Column
  description!: string;
}