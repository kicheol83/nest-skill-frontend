import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from "../../enums/member.enum";
import { MeLiked } from "../like/like";
import { MeFollowed } from "../follow/follow";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberAuthType: MemberAuthType;
  memberPhone: string;
  memberNick: string;
  memberPassword?: string;
  memberFullName?: string;
  memberEmail?: string;
  googleId?: string;
  memberImage: string;
  memberAddress?: string;
  memberDesc?: string;
  memberJobs: number;
  memberArticles: number;
  memberFollowers: number;
  memberFollowings: number;
  memberPoints: number;
  memberLikes: number;
  memberViews: number;
  memberComments: number;
  memberRank: number;
  memberWarnings: number;
  bannedAt?: Date;
  suspendedAt?: Date;
  deactivatedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
  /**from aggregation **/
  meLiked?: MeLiked[];
  meFollowed?: MeFollowed[];
}

export interface TotalCounter {
  total: number;
}

export interface Members {
  list: Member[];
  metaCounter: TotalCounter[];
}
