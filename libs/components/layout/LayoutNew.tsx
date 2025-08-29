import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import { Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import Chat from "../socket/Socket";

const withLayoutNew = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const { t, i18n } = useTranslation("common");
    const device = useDeviceDetect();
    const [authHeader, setAuthHeader] = useState<boolean>(false);

    const memoizedValues = useMemo(() => {
      let title = "",
        desc = "",
        bgImage = "";

      switch (router.pathname) {
        case "/service":
          title = "Service Page";
          desc = "Home / Service";
          bgImage = "/img/banner/gardening.jpg";

          break;
        case "/service/detail":
          title = "Service Page";
          desc = "Home / Service";
          bgImage = "/img/banner/home-banner.png";

          break;
        case "/provider":
          title = "Provider Page";
          desc = "Home / Provider / Detail";
          bgImage = "/img/banner/provider.jpg";

          break;
        case "/provider/detail":
          title = "Provider Detail Page";
          desc = "Home / Provider / Detail";
          bgImage = "/img/banner/provider.jpg";

          break;
        case "/mypage":
          title = "My Page";
          desc = "Home / My Page";
          bgImage = "/img/banner/deleveriy.jpg";
          break;
        case "/community":
          title = "Community Page";
          desc = "Home / Community";
          bgImage = "/img/banner/community.jpg";
          break;
        case "/community/detail":
          title = "Community Detail";
          desc = "Home / Community / Detail";
          bgImage = "/img/banner/community.jpg";
          break;
        case "/cs":
          title = "CS Page";
          desc = "Welcome to Our Customer Service Center!";
          bgImage = "/img/banner/header12.jpg";
          break;
        case "/account/join":
          title = "Login / Signup";
          desc = "Authentication Process";
          bgImage = "/img/banner/provider.jpg";
          setAuthHeader(true);
          break;
        case "/member":
          title = "Member Page";
          desc = "Home / Member";
          bgImage = "/img/banner/provider.jpg";
          break;
        case "/order":
          title = "Order Page";
          desc = "Home / Order";
          bgImage = "/img/banner/order.jpg";
          break;
        default:
          break;
      }

      return { title, desc, bgImage };
    }, [router.pathname]);

    /** LIFECYCLES **/

    /** HANDLERS **/

    if (device == "mobile") {
      return (
        <>
          <Head>
            <title>Skill Nest</title>
            <meta name={"title"} content={`Skill Nest`} />
          </Head>
          <Stack id="mobile-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>Skill Nest</title>
            <meta name={"title"} content={`Skill Nest`} />
          </Head>
          <Stack id="pc-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack
              className={`header-new ${authHeader && "auth"}`}
              style={{
                backgroundImage: `url(${memoizedValues.bgImage})`,
                backgroundSize: "cover",
                boxShadow: "inset 10px 40px 150px 40px rgb(24 22 36)",
              }}
            >
              <Stack className={"container"}>
                <strong className="blue-text">{t(memoizedValues.title)}</strong>
                <span className="small-text">{t(memoizedValues.desc)}</span>
              </Stack>
            </Stack>

            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            {user?._id && <Chat />}

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    }
  };
};

export default withLayoutNew;
