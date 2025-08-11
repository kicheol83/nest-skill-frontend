import { PaymentMethod, PaymentStatus } from "../../enums/payment.enum";

export interface UpdatePaymentInput {
  _id: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  orderId?: string;
  memberId?: string;
}
