import React, { useEffect } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";

import withLayoutNew from "@/libs/components/layout/LayoutNew";
import { useRouter } from "next/router";
import MemberFollowings from "@/libs/components/member/MemberFollowings";
import MemberArticles from "@/libs/components/member/MemberArticles";
import MemberFollowers from "@/libs/components/member/MemberFollowers";
import MemberMenu from "@/libs/components/member/MemberMenu";
import MemberPosts from "@/libs/components/member/MemberPost";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const MemberPage: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const category: any = router.query?.category;

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <>MEMBER PAGE MOBILE</>;
  } else {
    return (
      <div id="member-page" style={{ position: "relative" }}>
        <div className="container">
          <Stack className={"member-page"}>
            <Stack className={"back-frame"}>
              <Stack className={"left-config"}>
                <MemberMenu />
              </Stack>
              <Stack className="main-config" mb={"76px"}>
                <Stack className={"list-config"}>
                  {category === "memberposts" && <MemberPosts />}
                  {category === "followers" && <MemberFollowers />}
                  {category === "followings" && <MemberFollowings />}
                  {category === "articles" && <MemberArticles />}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

export default withLayoutNew(MemberPage);
