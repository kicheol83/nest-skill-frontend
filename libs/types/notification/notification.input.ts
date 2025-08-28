import { NotificationType } from "../../enums/notification.enum";
import { Direction } from "../../enums/common.enum";

export interface NotificationInput {
  notificationType: NotificationType;
  notificationTitle: string;
  notificationDesc: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
}

class NOTIFIearch {
  notificationType?: NotificationType;
  notificationTitle?: string;
  notificationDesc?: string;
  senderId?: string;
}

export interface NotificationInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search?: NOTIFIearch;
}
