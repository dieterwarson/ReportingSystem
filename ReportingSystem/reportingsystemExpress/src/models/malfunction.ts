import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import MalfunctionType from "./malfunctionType";

@Table
export default class Malfunction extends Model<Malfunction> {
  @Column
  malfunctionId!: number;
  @Column
  malfunctionTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  duration!: number;
}

