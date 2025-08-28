import { NotificationType } from "../../enums/notification.enum";
import { Member, TotalCounter } from "../member/member";

export interface Notification {
  _id: string;
  notificationType: NotificationType;
  notificationTitle: string;
  notificationDesc: string;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  memberData?: Member;
}

export interface Notifications {
  list: Notification[];
  metaCounter: TotalCounter[];
}
