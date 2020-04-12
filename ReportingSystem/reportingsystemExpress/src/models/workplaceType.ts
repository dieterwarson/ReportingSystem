import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export default class WorkplaceType extends Model<WorkplaceType> {
  @Column
  workplaceTypeId!: number;
  @Column
  typeName!: string;
}
