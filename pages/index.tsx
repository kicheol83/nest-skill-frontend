import Company from "@/libs/components/homepage/Company";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <Stack className={"home-page"}></Stack>;
  } else {
    return (
      <Stack className={"home-page"}>
        <Company />
      </Stack>
    );
  }
};

export default withLayoutMain(Home);
