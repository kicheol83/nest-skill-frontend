import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import withLayoutProvider from "@/libs/components/layout/LayoutProvider";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const Provider: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <Stack className={"home-page"}></Stack>;
  } else {
    return (
      <Stack className={"provider-page"}>
        <Stack className="container"></Stack>
      </Stack>
    );
  }
};

export default withLayoutProvider(Provider);
