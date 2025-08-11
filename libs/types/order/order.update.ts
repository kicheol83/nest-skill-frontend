import { OrderStatus } from "../../enums/order.enum";

export interface UpdateOrderInput {
  _id: string;
  orderPrice?: number;
  webTax?: number;
  totalPrice?: number;
  orderStatus?: OrderStatus;
  providerId?: string;
}
