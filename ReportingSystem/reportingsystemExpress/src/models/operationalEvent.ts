import {Table, Column, Model, HasMany} from 'sequelize-typescript';


@Table
export default class OperationalEvent extends Model<OperationalEvent> {
  @Column
  operationalEventId!: number;
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