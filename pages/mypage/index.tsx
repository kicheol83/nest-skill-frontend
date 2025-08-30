import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import MyMenu from "@/libs/components/mypage/MyMenu";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import MyPosts from "@/libs/components/mypage/MyPosts";
import MyFavorites from "@/libs/components/mypage/MyFavorites";
import RecentlyVisited from "@/libs/components/mypage/RecentlyVisited";
import MyArticles from "@/libs/components/mypage/MyArticles";
import WriteArticle from "@/libs/components/mypage/WriteArticles";
import MyProfile from "@/libs/components/mypage/MyProfile";
import MemberFollowers from "@/libs/components/mypage/MemberFollowers";
import MemberFollowings from "@/libs/components/mypage/MemberFollowings";
import ReviewDashboard from "@/libs/components/mypage/MyReviews";
import MyOrder from "@/libs/components/mypage/MyOrder";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMutation, useReactiveVar } from "@apollo/client";
import {
  LIKE_TARGET_MEMBER,
  SUBSICRIBE,
  UNSUBSCRIBE,
} from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { Messages } from "@/libs/config";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import NotificationPanel from "@/libs/components/mypage/Notifiaction";
import AddProviderPost from "@/libs/components/mypage/AddProviderPost";
import MemberOrder from "@/libs/components/mypage/MemberOrder";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const MyPage: NextPage = () => {
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const category: any = router.query?.category ?? "myProfile";

  /** APOLLO REQUESTS **/
  const [subscribe] = useMutation(SUBSICRIBE);
  const [unsubscribe] = useMutation(UNSUBSCRIBE);
  const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);
  /** LIFECYCLES **/
  useEffect(() => {
    if (!user._id) router.push("/").then();
  }, [user]);

  /** HANDLERS **/
  const subscribeHandler = async (id: string, refetch: any, query: any) => {
    try {
      console.log("id:", id);
      if (!id) throw new Error(Messages.error1);
      if (!user._id) throw new Error(Messages.error2);

      await subscribe({
        variables: {
          input: id,
        },
      });
      await sweetTopSmallSuccessAlert("Subscribed!", 800);
      await refetch({ input: query });
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
    try {
      if (!id) throw new Error(Messages.error1);
      if (!user._id) throw new Error(Messages.error2);

      await unsubscribe({
        variables: {
          input: id,
        },
      });
      await sweetTopSmallSuccessAlert("Unsubscribed", 800);
      await refetch({ input: query });
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const likeMemberHandler = async (id: string, refetch: any, query: any) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Messages.error2);

      await likeTargetMember({
        variables: {
          input: id,
        },
      });
      console.log("input =>", likeTargetMember);
      console.log("id =>", id);
      console.log("query =>", query);
      await sweetTopSmallSuccessAlert("Succes!", 800);
      await refetch({ input: query });
    } catch (err: any) {
      console.log("ERROR, likeMemberHandler:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const redirectToMemberPageHandler = async (memberId: string) => {
    try {
      if (memberId === user?._id)
        await router.push(`/mypage?memberId=${memberId}`);
      else await router.push(`/member?memberId=${memberId}`);
    } catch (error) {
      await sweetErrorHandling(error);
    }
  };

  if (device === "mobile") {
    return <div>MY PAGE</div>;
  } else {
    return (
      <div id="my-page" style={{ position: "relative" }}>
        <div className="container">
          <Stack className={"my-page"}>
            <Stack className={"back-frame"}>
              <Stack className={"left-config"}>
                <MyMenu />
              </Stack>
              <Stack className="main-config" mb={"76px"}>
                <Stack className={"list-config"}>
                  {category === "addPost" && <AddProviderPost />}
                  {category === "myPosts" && <MyPosts />}
                  {category === "myFavorites" && <MyFavorites />}
                  {category === "recentlyVisited" && <RecentlyVisited />}
                  {category === "myArticles" && <MyArticles />}
                  {category === "writeArticle" && <WriteArticle />}
                  {category === "myProfile" && <MyProfile />}
                  {category === "followers" && (
                    <MemberFollowers
                      subscribeHandler={subscribeHandler}
                      likeMemberHandler={likeMemberHandler}
                      unsubscribeHandler={unsubscribeHandler}
                      redirectToMemberPageHandler={redirectToMemberPageHandler}
                    />
                  )}
                  {category === "followings" && (
                    <MemberFollowings
                      subscribeHandler={subscribeHandler}
                      likeMemberHandler={likeMemberHandler}
                      unsubscribeHandler={unsubscribeHandler}
                      redirectToMemberPageHandler={redirectToMemberPageHandler}
                    />
                  )}
                  {category === "reviews" && <ReviewDashboard />}
                  {category === "memberOrder" && <MemberOrder />}
                  {category === "myOrder" && <MyOrder />}
                  {category === "notification" && <NotificationPanel />}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

export default withLayoutNew(MyPage);
