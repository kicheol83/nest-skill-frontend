import { Stack } from "@mui/material";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../Footer";
import Top from "../Top";
import HeaderProvider from "../header/HeaderProvider";

const withLayoutProvider = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Nest Skill</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            <Top />
          </Stack>
          <Stack className="header-basic">
            <Stack className="container">
              <HeaderProvider />
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

export default withLayoutProvider;
