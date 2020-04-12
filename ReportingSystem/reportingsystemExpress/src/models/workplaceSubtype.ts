import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class WorkplaceSubtype extends Model<WorkplaceSubtype> {
  @Column
  workplaceSubtypeId!: number;
  @Column
  typeName!: string;
  @Column
  description!: string;
}