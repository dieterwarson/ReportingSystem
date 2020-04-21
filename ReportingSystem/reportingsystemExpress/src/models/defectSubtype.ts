import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class DefectSubtype extends Model<DefectSubtype> {
  @Index
    
  @Column
  typeName!: string;
  @Column
  description!: string;
}
