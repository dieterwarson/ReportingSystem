import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class OperationalSubtype extends Model<OperationalSubtype> {
  @Index
    
  @Column
  typeName!: string;
  @Column
  description!: string;
}
