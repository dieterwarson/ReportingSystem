import { Table, Column, Model, Index, HasMany, ForeignKey } from 'sequelize-typescript';
import Defect from './defect';
import Malfunction from './malfunction';
import WorkplaceEvent from './workplaceEvent';
import SecretariatNotification from './secretariatNotification';
import OperationalEvent from './operationalEvent';
import UserPermissions from './userPermissions';

@Table
export default class User extends Model<User> {
  @Index

  @Column
  username!: string;

  @Column
  password!: string;

  @ForeignKey(() => UserPermissions)
  @Column
  accessRights!: number;

  @Column
  email!: string;

  @Column
  subscription!: boolean;

  @Column
  loggedIn!: boolean;

  @HasMany(() => Defect)
  defects!: Defect[];

  @HasMany(() => Malfunction)
  malfunctions!: Malfunction[];

  @HasMany(() => WorkplaceEvent)
  workplaceEvents!: WorkplaceEvent[];

  @HasMany(() => SecretariatNotification)
  secretariatNotifications!: SecretariatNotification[];

  @HasMany(() => OperationalEvent)
  operationalEvents!: OperationalEvent[];
  
}

// TODO provide safe way to save user
