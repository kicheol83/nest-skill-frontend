import { gql } from "@apollo/client";

/**************************
 *         soon..         *
 *************************/
export const GET_ORDERS_BY_PROVIDER = gql`
  query GetOrdersByProvider($input: OrderInquiry!) {
    getOrdersByProvider(input: $input) {
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
        orderItems {
          _id
          itemPrice
          orderId
          providerId
          createdAt
          updatedAt
        }
        address {
          fullName
          phone
          city
          street
          zipcode
        }
        providerData {
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
    }
  }
`;
