import { Table, Column, Model, Index, ForeignKey } from 'sequelize-typescript';
import OperationalSubtype from './operationalSubtype';

@Table
export default class OperationalType extends Model<OperationalType> {
  @Index
    
  @ForeignKey(() => OperationalSubtype)
  @Column
  operationalSubtypeId!: number;
  @Column
  typeName!: string;
}
