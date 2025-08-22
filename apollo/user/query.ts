import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GET_PROVIDER = gql`
  query GetProviderMember($input: ProviderInquiry!) {
    getProviderMember(input: $input) {
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
        bannedAt
        suspendedAt
        deactivatedAt
        deletedAt
        createdAt
        updatedAt
        accessToken
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER = gql`
  query GetMember($input: String!) {
    getMember(memberId: $input) {
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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
      meFollowed {
        followingId
        followerId
        myFollowing
      }
    }
  }
`;

/**************************
 *     PROVIDER POST      *
 *************************/

export const GET_PROVIDER_POST = gql`
  query GetProvider($input: String!) {
    getProvider(providerId: $input) {
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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_PROVIDER_POSTS = gql`
  query GetProviderJobs($input: ProviderJobsInquiry!) {
    getProviderJobs(input: $input) {
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
          memberBlocks
          bannedAt
          suspendedAt
          deactivatedAt
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_PROVIDER_MEMBER_POSTS = gql`
  query GetProviderMemberJobs($input: ProviderMemberInquiry!) {
    getProviderMemberJobs(input: $input) {
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites($input: OrdinaryInquiry!) {
    getFavorites(input: $input) {
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_VISITED = gql`
  query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_PROVIDER_TYPE_COUNT = gql`
  query GetProviderPostCount($type: ProviderType!) {
    getProviderPostCount(type: $type) {
      count
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
  query GetBoardArticle($input: String!) {
    getBoardArticle(articleId: $input) {
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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_BOARD_ARTICLES = gql`
  query GetBoardArticles($input: BoardArticlesInquiry!) {
    getBoardArticles(input: $input) {
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
        meLiked {
          memberId
          likeRefId
          myFavorite
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
  query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
        followerData {
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWINGS = gql`
  query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
        followingData {
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         ORDER          *
 *************************/
export const GET_MY_ORDER = gql`
  query GetMyOrder($input: String!) {
    getMyOrder(orderId: $input) {
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
  }
`;

export const GET_MY_ORDERS = gql`
  query GetMyOrders($input: OrderInquiry!) {
    getMyOrders(input: $input) {
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
 *         ORDER          *
 *************************/
export const GET_REVIEW = gql`
  query GetReview($input: String!) {
    getReview(reviewId: $input) {
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

export const GET_REVIEWS = gql`
  query GetReviews($input: ReviewInquiry!) {
    getReviews(input: $input) {
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
export const GET_PAYMENT = gql`
  query GetPayment($input: String!) {
    getPayment(paymentId: $input) {
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

export const GET_PAYMENTS = gql`
  query GetPayments($input: PaymentInquiry!) {
    getPayments(input: $input) {
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
