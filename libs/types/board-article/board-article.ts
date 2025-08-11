import {
  BoardArticleCategory,
  BoardArticleStatus,
} from "../../enums/board-article.enum";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";

export interface BoardArticle {
  _id: string;
  articleCategory: BoardArticleCategory;
  articleStatus: BoardArticleStatus;
  articleTitle: string;
  articleContent: string;
  articleImage?: string;
  articleViews: number;
  articleLikes: number;
  articleComments: number;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  memberData?: Member;
  meLiked?: MeLiked[];
}

export interface BoardArticles {
  list: BoardArticle[];
  metaCounter: TotalCounter[];
}
