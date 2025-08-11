import { Direction } from "../../enums/common.enum";
import { OrderStatus } from "../../enums/order.enum";

export interface CreateOrderInput {
  itemPrice: number;
  providerId: string;
  order?: string;
  memberId?: string;
}

interface ORsearch {
  text?: string;
  orderStatus?: OrderStatus;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search?: ORsearch;
}

/** ADMIN  **/
interface ORSsearch {
  text?: string;
  orderStatus?: OrderStatus;
  memberId?: string;
}

export interface OrdersInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search: ORSsearch;
}
