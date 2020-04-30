import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import WorkplaceType from './workplaceType';

@Table
export default class WorkplaceSubtype extends Model<WorkplaceSubtype> {
  @Index
    
  @Column
  typeName!: string;

  @Column
  description!: string;

  @ForeignKey(() => WorkplaceType)
  @Column
  workplaceTypeId!: number;

  @BelongsTo(() => WorkplaceType)
  workplaceType!: WorkplaceType;
}
