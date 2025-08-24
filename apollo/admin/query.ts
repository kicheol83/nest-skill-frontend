import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
  query GetAllMembersByAdmin($input: MembersInquiry!) {
    getAllMembersByAdmin(input: $input) {
      list {
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *    PROVIDER POST       *
 *************************/
export const GET_ALL_PROVIDER_JOBS_BY_ADMIN = gql`
  query GetAllProviderJobsByAdmin($input: AllProviderJobsInquiry!) {
    getAllProviderJobsByAdmin(input: $input) {
      list {
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/
export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
  query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiry!) {
    getAllBoardArticlesByAdmin(input: $input) {
      list {
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
          bannedAt
          suspendedAt
          deactivatedAt
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/
export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
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
          bannedAt
          suspendedAt
          deactivatedAt
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         ORDER          *
 *************************/
export const GET_ALL_ORDERS_BY_ADMIN = gql`
  query GetAllOrdersByAdmin($input: OrderInquiry!) {
    getAllOrdersByAdmin(input: $input) {
      list {
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
          bannedAt
          suspendedAt
          deactivatedAt
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
        address {
          fullName
          phone
          city
          street
          zipcode
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         REVIEW          *
 *************************/
export const GET_ALL_REVIEWS_BY_ADMIN = gql`
  query GetAllReviewByAdmin($input: ReviewInquiry!) {
    getAllReviewByAdmin(input: $input) {
      list {
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
          memberEmail
          googleId
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         PAYMENT        *
 *************************/
export const GET_PAYMENTS_BY_ADMIN = gql`
  query GetPaymentsByAdmin($input: PaymentInquiry!) {
    getPaymentsByAdmin(input: $input) {
      list {
        _id
        paymentAmount
        paymentStatus
        paymentMethod
        transactionId
        orderId
        memberId
        deletedAt
        updatedAt
        createdAt
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
          memberEmail
          googleId
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_PAYMENT_BY_ID_ADMIN = gql`
  query GetPaymentByAdmin($input: String!) {
    getPaymentByAdmin(paymentId: $input) {
      _id
      paymentAmount
      paymentStatus
      paymentMethod
      transactionId
      orderId
      memberId
      deletedAt
      updatedAt
      createdAt
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
        memberEmail
        googleId
      }
    }
  }
`;

/**************************
 *         NOTICE         *
 *************************/
export const GET_NOTICES_BY_ADMIN = gql`
  query GetNoticesForAdmin($input: NoticeInquiry!) {
    getNoticesForAdmin(input: $input) {
      list {
        _id
        noticeCategory
        noticeStatus
        noticeTitle
        noticeContent
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
          memberEmail
          googleId
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_NOTICE_BY_ID_ADMIN = gql`
  query GetNoticeById($input: String!) {
    getNoticeById(_id: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
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
        memberEmail
        googleId
      }
    }
  }
`;
