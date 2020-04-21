import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class Technical extends Model<Technical> {
  @Index
    
  @Column
  technicalId!: number;
}
