import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import { Stack } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { useTranslation } from "next-i18next";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const withLayoutNew = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const device = useDeviceDetect();
    const [authHeader, setAuthHeader] = useState<boolean>(false);

    const memoizedValues = useMemo(() => {
      let title = "",
        desc = "",
        bgImage = "";

      switch (router.pathname) {
        case "/provider":
          title = "Provider Page";
          desc = "Home / Provider / Detail";
          bgImage = "/img/banner/banner-new.avif";

          break;
        case "/provider/detail":
          title = "Provider Detail Page";
          desc = "Home / Provider / Detail";
          bgImage = "/img/banner/banner1.png";

          break;
        case "/mypage":
          title = "my page";
          desc = "Home / For Rent";
          bgImage = "/img/banner/header1.svg";
          break;
        case "/community":
          title = "Community !!!";
          desc = "Home / Community";
          bgImage = "/img/banner/banner1.png";
          break;
        case "/community/detail":
          title = "Community Detail";
          desc = "Home / Community / Detail";
          bgImage = "/img/banner/banner1.png";
          break;
        case "/cs":
          title = "CS";
          desc = "Welcome to Our Customer Service Center!";
          bgImage = "/img/banner/header12.jpg";
          break;
        case "/account/join":
          title = "Login/Signup";
          desc = "Authentication Process";
          bgImage = "/img/banner/banner-login.avif";
          setAuthHeader(true);
          break;
        case "/member":
          title = "Member Page";
          desc = "Home / For Rent";
          bgImage = "/img/banner/header1.svg";
          break;
              break;
        case "/order":
          title = "Order Page";
          desc = "Home / For Rent";
          bgImage = "/img/banner/banner-login.avif";
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
                <strong className="blue-text">{memoizedValues.title}</strong>
                <span className="small-text">{memoizedValues.desc}</span>
              </Stack>
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
    }
  };
};

export default withLayoutNew;
