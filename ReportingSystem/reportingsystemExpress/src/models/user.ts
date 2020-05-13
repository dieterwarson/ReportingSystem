import { Table, Column, Model, Index, HasMany } from 'sequelize-typescript';
import Defect from './defect';
import Malfunction from './malfunction';
import Replacement from './replacement';
import WorkplaceEvent from './workplaceEvent';
import SecretariatNotification from './secretariatNotification';
import OperationalEvent from './operationalEvent';

@Table
export default class User extends Model<User> {
  @Index
    
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  accessRights!: number;

  @Column
  email!: string;

  @Column
  subscription!: boolean;

  @HasMany(() => Defect)
  defects!: Defect[];

  @HasMany(() => Malfunction)
  malfunctions!: Malfunction[];

  @HasMany(() => Replacement)
  replacements!: Replacement[];

  @HasMany(() => WorkplaceEvent)
  workplaceEvents!: WorkplaceEvent[];

  @HasMany(() => SecretariatNotification)
  secretariatNotifications!: SecretariatNotification[];

  @HasMany(() => OperationalEvent)
  operationalEvents!: OperationalEvent[];
}

// TODO provide safe way to save user
