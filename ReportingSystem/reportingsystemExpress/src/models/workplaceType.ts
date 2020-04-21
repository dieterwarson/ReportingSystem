import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import WorkplaceSubtype from './workplaceSubtype';

@Table
export default class WorkplaceType extends Model<WorkplaceType> {
  @Index
    
  @ForeignKey(() => WorkplaceSubtype)
  @Column
  workplaceSubtypeId!: number;
  @Column
  typeName!: string;
}
