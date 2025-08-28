import { gql } from "@apollo/client";

/**************************
 *         GOOGLE         *
 *************************/
export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      accessToken
    }
  }
`;

/**************************
 *         MEMBER         *
 *************************/
export const SIGN_UP = gql`
  mutation Signup($input: MemberInput!) {
    signup(input: $input) {
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
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($input: MemberUpdate!) {
    updateMember(input: $input) {
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

export const LIKE_TARGET_MEMBER = gql`
  mutation LikeTargetMember($input: String!) {
    likeTargetMember(memberId: $input) {
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
`;

/**************************
 *     PROVIDER POST      *
 *************************/

export const CREATE_PROVIDER_POST = gql`
  mutation CreateProvider($input: ProviderPostInput!) {
    createProvider(input: $input) {
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
    }
  }
`;

export const UPDATE_PROVIDER_POST = gql`
  mutation UpdateProviderPost($input: ProviderPostUpdate!) {
    updateProviderPost(input: $input) {
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
    }
  }
`;

export const LIKE_TARGET_PROVIDER_POST = gql`
  mutation LikeTargetProviderPost($input: String!) {
    likeTargetProviderPost(_id: $input) {
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

export const CREATE_BOARD_ARTICLE = gql`
  mutation CreateBoardArticle($input: BoardArticleInput!) {
    createBoardArticle(input: $input) {
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

export const UPDATE_BOARD_ARTICLE = gql`
  mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
    updateBoardArticle(input: $input) {
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

export const LIKE_TARGET_BOARD_ARTCILE = gql`
  mutation LikeTargetBoardArticle($input: String!) {
    likeTargetBoardArticle(articleId: $input) {
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

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($input: CommentUpdate!) {
    updateComment(input: $input) {
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
 *         FOLLOW        *
 *************************/

export const SUBSICRIBE = gql`
  mutation Subscribe($input: String!) {
    subscribe(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
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
  }
`;

export const UNSUBSCRIBE = gql`
  mutation Unsubscribe($input: String!) {
    unsubscribe(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
    }
  }
`;

/**************************
 *          ORDER         *
 *************************/

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
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

export const UPDATE_ORDER = gql`
  mutation UpdateMyOrder($input: UpdateOrderInput!) {
    updateMyOrder(input: $input) {
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

/**************************
 *          REVIEW        *
 *************************/
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      _id
      reviewRating
      reviewComments
      reviewImages
      orderItemId
      providerId
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
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

export const DELETE_MY_REVIEW = gql`
  mutation DeleteMyReview($input: String!) {
    deleteMyReview(_id: $input)
  }
`;

/**************************
 *          PAYMENT       *
 *************************/
export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
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

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
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

export const DELETE_PAYMENT = gql`
  mutation DeletePayment($input: String!) {
    deletePayment(paymentId: $input)
  }
`;

/**************************
 *    NOTIFICATION        *
 *************************/
export const CREATE_NOTIFIACTION = gql`
  mutation CreateNotification($input: NotificationInput!) {
    createNotification(input: $input) {
      _id
      notificationType
      notificationTitle
      notificationDesc
      senderId
      receiverId
      isRead
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

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($input: NotificationUpdate!) {
    updateNotification(input: $input) {
      _id
      notificationType
      notificationTitle
      notificationDesc
      senderId
      receiverId
      isRead
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

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($input: String!) {
    deleteNotification(id: $input)
  }
`;

export const MARK_ALL_READ = gql`
  mutation MarkAllAsRead($input: String!) {
    markAllAsRead(id: $input)
  }
`;
