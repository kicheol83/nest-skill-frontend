import { Stack } from "@mui/material";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../Footer";
import Top from "../Top";
import HeaderOther from "../header/HeaderOther";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import Chat from "../socket/Socket";

const withLayoutOther = (Component: any) => {
  return (props: any) => {
    const user = useReactiveVar(userVar);
    return (
      <>
        <Head>
          <title>Skill Nest</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            <Top />
          </Stack>
          <Stack className="header-other">
            <Stack className="container">
              <HeaderOther />
            </Stack>
          </Stack>

          <Stack id="main">
            <Component {...props} />
          </Stack>
          {user?._id && <Chat />}

          <Stack id={"footer"}>
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutOther;
