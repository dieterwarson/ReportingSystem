import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';

@Table
export default class WorkplaceType extends Model<WorkplaceType> {
  @Index
  @Column
  typeName!: string;
}
