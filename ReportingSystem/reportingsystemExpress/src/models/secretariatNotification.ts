import { Model } from "sequelize";

export class SecretariatNotification extends Model {
  public secretariatNotificationId!: number;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
  public description!: string;
}
