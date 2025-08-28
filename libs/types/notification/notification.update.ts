import { NotificationType } from "../../enums/notification.enum";

export interface NotificationUpdate {
  _id: string;
  notificationType?: NotificationType;
  notificationTitle?: string;
  notificationDesc?: string;
}
