import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/
export const UPDATE_MEMBER_BY_ADMIN = gql`
  mutation UpdateMemberByAdmin($input: MemberUpdate!) {
    updateMemberByAdmin(input: $input) {
      _id
      memberType
      memberStatus
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberJobs
      memberArticles
      memberFollowers
      memberFollowings
      memberPoints
      memberLikes
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      deletedAt
      createdAt
      updatedAt
      accessToken
    }
  }
`;

/**************************
 *      PROVIDER POST     *
 *************************/
export const UPDATE_PROVIDER_POSTS_BY_ADMIN = gql`
  mutation UpdateProviderPostyByAdmin($input: ProviderPostUpdate!) {
    updateProviderPostyByAdmin(input: $input) {
      _id
      providerType
      providerStatus
      providerLocation
      providerLevel
      providerWorkWeekday
      providerWeekday
      providerRateType
      providerWorkDayLimit
      providerStartTime
      providerEndTime
      providerAddress
      providerTitle
      providerWorkPrice
      providerViews
      providerLikes
      providerComments
      providerRank
      providerImages
      providerDesc
      memberId
      deletedAt
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

export const REMOVE_PROVIDER_POST_BY_ADMIN = gql`
  mutation RemoveProviderPostyByAdmin($input: String!) {
    removeProviderPostyByAdmin(providerId: $input) {
      _id
      providerType
      providerStatus
      providerLocation
      providerLevel
      providerWorkWeekday
      providerWeekday
      providerRateType
      providerWorkDayLimit
      providerStartTime
      providerEndTime
      providerAddress
      providerTitle
      providerWorkPrice
      providerViews
      providerLikes
      providerComments
      providerRank
      providerImages
      providerDesc
      memberId
      deletedAt
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/
export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
    updateBoardArticleByAdmin(input: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation RemoveBoardArticleByAdmin($input: String!) {
    removeBoardArticleByAdmin(input: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/
export const REMOVE_COMMENT_BY_ADMIN = gql`
  mutation RemoveCommentByAdmin($input: String!) {
    removeCommentByAdmin(commentId: $input) {
      _id
      commentStatus
      commentGroup
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

/**************************
 *         ORDER          *
 *************************/
export const UPDATE_ORDER_BY_ADMIN = gql`
  mutation UpdateOrderByAdmin($input: UpdateOrderInput!) {
    updateOrderByAdmin(input: $input) {
      _id
      orderPrice
      webTax
      orderStatus
      totalPrice
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

/**************************
 *         REVIEW         *
 *************************/
export const UPDATE_REVIEW_BY_ADMIN = gql`
  mutation UpdateReviewByAdmin($input: UpdateReviewInput!) {
    updateReviewByAdmin(input: $input) {
      _id
      reviewRating
      reviewComments
      reviewImages
      orderItemId
      providerId
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

export const DELETE_REVIEW_BY_ADMIN = gql`
  mutation DeleteReviewByAdmin($input: String!) {
    deleteReviewByAdmin(_id: $input) {
      _id
      reviewRating
      reviewComments
      reviewImages
      orderItemId
      providerId
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberJobs
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;
