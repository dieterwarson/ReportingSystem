import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';


@Table
export default class OperationalEvent extends Model<OperationalEvent> {
  @Index
  @Column
  operationalTypeId!: number;
  @Column
  signaling!: string;
  @Column
  plNumber!: string;
  @Column
  description!: string;
  @Column
  location!: string;
  @Column
  unit!: string;
  @Column
  date!: Date;
}
