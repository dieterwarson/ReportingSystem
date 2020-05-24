import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import WorkplaceType from './workplaceType';
import WorkplaceEvent from './workplaceEvent';

@Table
export default class WorkplaceSubtype extends Model<WorkplaceSubtype> {
  @Index
  
  @ForeignKey(() => WorkplaceType)
  @Column
  workplaceTypeId!: number;
  
  @BelongsTo(() => WorkplaceType)
  workplaceType!: WorkplaceType;
    
  @Column
  typeName!: string;

  @Column
  description!: string;

  @HasMany(() => WorkplaceEvent)
  malfunctions!: WorkplaceEvent[];
}
