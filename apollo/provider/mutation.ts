import { gql } from "@apollo/client";

/**************************
 *         ORDER          *
 *************************/
export const UPDATE_MY_ORDER_BY_PROVIDER = gql`
  mutation UpdateMyOrderProvider($input: UpdateOrderInput!) {
    updateMyOrderProvider(input: $input) {
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
    }
  }
`;
