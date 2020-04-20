import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class Operational extends Model<Operational> {
  @Index
    
  @Column
  operationalId!: number;
}
