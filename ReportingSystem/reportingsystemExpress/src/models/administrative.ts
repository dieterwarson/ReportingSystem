import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class Administrative extends Model<Administrative> {
  @Index
    
  @Column
  administrativeId!: number;
}
