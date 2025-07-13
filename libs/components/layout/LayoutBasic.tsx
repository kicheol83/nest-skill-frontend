import { Stack } from "@mui/material";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Nest Skill</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            {/* <Top /> */}
            Header Basic
          </Stack>
          <Stack className="header-main">
            <Stack className="container">{/* <HeaderFilter /> */}</Stack>
          </Stack>

          <Stack id="main">
            <Component {...props} />
          </Stack>

          <Stack id={"footer"}>
            {/* <Footer /> */}
            Footer
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutBasic;
