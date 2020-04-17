import { WorkplaceEvent } from './workplaceEvent';
import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';


@Table
export default class Administrative extends Model<Administrative> {
  @Index

  @Column
  administrativeId!: number;
}
