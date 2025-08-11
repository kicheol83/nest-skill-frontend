import { Direction } from "../../enums/common.enum";

export interface CreateReviewInput {
  reviewRating: number;
  reviewComments?: string;
  reviewImages?: string[];
  providerId?: string;
  orderItemId?: string;
  memberId?: string;
}

interface RSearch {
  text?: string;
  reviewComments?: string;
  memberId?: string;
}

export interface ReviewInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search: RSearch;
}

export interface DeleteReviewInput {
  id: string;
}
