import { Box, Stack } from "@mui/material";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Top from "../Top";
import Footer from "../Footer";
import HeaderFilter from "../common/HeaderFilter";

const withLayoutMain = (Component: any) => {
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

          <Stack className="header-main">
            <div className="rectangle"></div>
            <Stack className="container">
              <Box className="header-title">
                <div className="big-text">
                  Discover <br />
                  more than <div className="blue-text">5000+ Jobs</div>
                </div>
                <img
                  src="/img/profile/blue-bottom-line2.svg"
                  alt=""
                  style={{ marginTop: "5px" }}
                />
                <span className="small-text">
                  Great platform for the job seeker that searching for new
                  career heights and passionate about startups.
                </span>
              </Box>
              <Box className="banner">
                <img src="/img/banner/banner-people.png" alt="" />
                <img className="rec1" src="/rectangle/rec1.svg" alt="" />
                <img className="rec2" src="/rectangle/rec2.svg" alt="" />
                <img className="rec3" src="/rectangle/rec3.svg" alt="" />
                <img className="rec4" src="/rectangle/rec4.svg" alt="" />
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

export default withLayoutMain;
