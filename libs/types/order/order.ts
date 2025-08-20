import { OrderStatus } from "../../enums/order.enum";
import { Member, TotalCounter } from "../member/member";

export interface Order {
  _id: string;
  orderPrice: number;
  webTax: number;
  orderStatus: OrderStatus;
  totalPrice: number;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  memberData?: Member;
}

export interface Orders {
  list: Order[];
  metaCounter: TotalCounter[];
}

export interface OrderItem {
  itemPrice: number;
  orderId: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}
