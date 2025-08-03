import { Box, Stack } from "@mui/material";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../Footer";
import HeaderFilter from "../common/HeaderFilter";
import Top from "../Top";

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Skill Nest</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            <Top />
          </Stack>
          <Stack className="header-basic">
            <Stack className="container">
              <Box className="header-title">
                <div className="big-text">
                  Find your<div className="blue-text">dreamjob</div>
                </div>
                <img
                  src="/img/profile/blue-bottom-line2.svg"
                  alt=""
                  style={{
                    marginLeft: "218px",
                    width: "262px",
                    marginTop: "-8px",
                  }}
                />
                <span className="small-text">
                  Find your next career at companies like HubSpot, Nike, and
                  Dropbox
                </span>
              </Box>
              <HeaderFilter />
            </Stack>
          </Stack>

          <Stack id="main">
            <Component {...props} />
          </Stack>

          <Stack id={"footer"}>
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutBasic;
