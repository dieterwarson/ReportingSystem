import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Report from './report';
import Defect from './defect';
import Malfuction from './malfunction';

@Table
export default class Technical extends Model<Technical> {
  @Index

  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @BelongsTo(() => Report)
  report!: Report;

  @HasMany(() => Defect)
  defects!: Defect[];

  @HasMany(() => Malfuction)
  malfunctions!: Malfuction[];
}
