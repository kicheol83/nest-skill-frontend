import Afisha from "@/libs/components/homepage/Afisha";
import Category from "@/libs/components/homepage/Category";
import Company from "@/libs/components/homepage/Company";
import Featured from "@/libs/components/homepage/FeaturedJobPost";
import LatestJobs from "@/libs/components/homepage/LatestJobs";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";
import { NextPage } from "next";
import Review from "@/libs/components/homepage/Review";
import CommunityBoard from "@/libs/components/homepage/Community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const Home: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <Stack className={"home-page"}></Stack>;
  } else {
    return (
      <Stack className={"home-page"}>
        <Company />
        <Category />
        <Afisha />
        <Featured />
        <LatestJobs />
        <CommunityBoard />
        <Review />
      </Stack>
    );
  }
};

export default withLayoutMain(Home);
