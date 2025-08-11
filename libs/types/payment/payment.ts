import { PaymentMethod, PaymentStatus } from "../../enums/payment.enum";
import { Member, TotalCounter } from "../member/member";

export interface Payment {
  _id: string;
  paymentAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  orderId: string;
  memberId: string;
  createdAt: Date;
  /** from aggregation **/
  memberData?: Member;
}

export interface Payments {
  list: Payment[];
  metaCounter: TotalCounter[];
}
