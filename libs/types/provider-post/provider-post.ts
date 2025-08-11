import {
  ProviderLevel,
  ProviderLocation,
  ProviderRateType,
  ProviderStatus,
  ProviderType,
  ProviderWeekday,
  ProviderWorkWeekday,
} from "../../enums/provider.enum";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";

export interface ProviderPost {
  _id: string;
  providerType: ProviderType;
  providerStatus: ProviderStatus;
  providerLocation: ProviderLocation;
  providerLevel: ProviderLevel;
  providerWorkWeekday: ProviderWorkWeekday;
  providerWeekday: ProviderWeekday[];
  providerRateType: ProviderRateType;
  providerWorkDayLimit: number;
  providerStartTime: string;
  providerEndTime: string;
  providerAddress: string;
  providerTitle: string;
  providerWorkPrice: number;
  providerViews: number;
  providerLikes: number;
  providerComments: number;
  providerRank: number;
  providerImages: string[];
  providerDesc?: string;
  memberId: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  memberData?: Member;
  meLiked?: MeLiked[];
}

export interface ProviderPosts {
  list: ProviderPost[];
  metaCounter: TotalCounter[];
  text?: string[];
}
