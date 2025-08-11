import { PaymentMethod, PaymentStatus } from "../../enums/payment.enum";
import { Direction } from "../../enums/common.enum";

export interface CreatePaymentInput {
  paymentAmount: number;
  paymentMethod: PaymentMethod;
  orderId: string;
  memberId?: string;
}

class ORDsearch {
  text?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
}

export interface ReviewInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search?: ORDsearch;
}

interface ORDAsearch {
  text?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
}

export interface AllReviewsInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search?: ORDAsearch;
}
