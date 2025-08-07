import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import MyMenu from "@/libs/components/mypage/MyMenu";
import AddProperty from "@/libs/components/mypage/AddProviderPost";
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
import MyMessages from "@/libs/components/mypage/MyMessages";

const MyPage: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const category: any = router.query?.category ?? "myProfile";

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/

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
                  {category === "addPost" && <AddProperty />}
                  {category === "myPosts" && <MyPosts />}
                  {category === "myFavorites" && <MyFavorites />}
                  {category === "recentlyVisited" && <RecentlyVisited />}
                  {category === "myArticles" && <MyArticles />}
                  {category === "writeArticle" && <WriteArticle />}
                  {category === "myProfile" && <MyProfile />}
                  {category === "followers" && <MemberFollowers />}
                  {category === "followings" && <MemberFollowings />}
                  {category === "reviews" && <ReviewDashboard />}
                  {category === "myOrder" && <MyOrder />}
                  {category === "myMessage" && <MyMessages />}



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
