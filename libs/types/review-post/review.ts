import { Member, TotalCounter } from "../member/member";

export interface Review {
  _id: string;
  reviewRating: number;
  reviewComments?: string;
  reviewImages?: string[];
  orderItemId: string;
  providerId: string;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  memberData?: Member;
}

export interface Reviews {
  list: Review[];
  metaCounter: TotalCounter[];
}
