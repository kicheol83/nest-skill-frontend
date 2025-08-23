import { OrderStatus } from "../../enums/order.enum";
import { Member, TotalCounter } from "../member/member";

export interface Address {
  fullName: string;
  phone: string;
  city: string;
  street: string;
  zipcode?: string;
}

export interface OrderItem {
  _id: string;
  itemPrice: number;
  orderId: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  address?: Address;
  orderItems?: OrderItem[];
}

export interface Orders {
  list: Order[];
  metaCounter: TotalCounter[];
}
