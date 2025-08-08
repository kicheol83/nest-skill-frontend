import { Box, Button, Menu, MenuItem, Stack } from "@mui/material";
import { useRouter, withRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import React, { useEffect, useState, useCallback } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Top = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [lang, setLang] = useState<string | null>("en");
  const drop = Boolean(anchorEl2);
  const [colorChange, setColorChange] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("locale") === null) {
      localStorage.setItem("locale", "en");
      setLang("en");
    } else {
      setLang(localStorage.getItem("locale"));
    }
  }, [router]);

  /** HANDLERS **/
  const langClick = (e: any) => {
    setAnchorEl2(e.currentTarget);
  };

  const langClose = () => {
    setAnchorEl2(null);
  };

  const langChoice = useCallback(
    async (e: any) => {
      setLang(e.target.id);
      localStorage.setItem("locale", e.target.id);
      setAnchorEl2(null);
      await router.push(router.asPath, router.asPath, { locale: e.target.id });
    },
    [router]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Stack className="navbar">
      <Stack className={`navbar-main ${colorChange ? "scrolled" : ""}`}>
        <Stack className="container">
          {/* Logo */}
          <Box component="div" className="logo-box">
            <Link href="" className="logo">
              <img src="/icons/nest-logo.svg" alt="Logo" />
              <p>Skill Nest</p>
            </Link>
          </Box>

          {/* Router links */}
          <Box component="div" className="router-box">
            <Link href={"/"}>
              <div>{t("Home")}</div>
            </Link>
            <Link href={"/service"}>
              <div>{t("Service")}</div>
            </Link>
            <Link href={"/provider"}>
              <div> {t("Provider")} </div>
            </Link>
            <Link href={"/community?articleCategory=FREE"}>
              <div> {t("Community")} </div>
            </Link>

            <Link href={"/mypage"}>
              <div> {t("My Page")} </div>
            </Link>
            <Link href={"/cs"}>
              <div> {t("CS")} </div>
            </Link>
          </Box>

          {/* User and Language Selector */}
          <Box className="user-box">
            {/* Avatar (if logged in) */}

            {/* Auth Links */}
            <Box className="auth-box">
              <Box className="user-avatar">
                <AccountCircleIcon
                  sx={{ color: "white", marginTop: "5px", marginRight: "5px" }}
                />
              </Box>

              <Link href="/account/join" className="auth-link">
                {t("Login")}
              </Link>
              <span className="divider">|</span>
              <Link href="/account/join" className="auth-link">
                {t("Signup")}
              </Link>
            </Box>

            {/* Language Selector */}
            <Box className="lang-box">
              <NotificationsOutlinedIcon className={"notification-icon"} />
              <Button disableRipple className="lang-btn" onClick={langClick}>
                <Box className="flag" sx={{ marginLeft: "8px" }}>
                  <img
                    src={`/img/flag/lang${lang}.png`}
                    alt="flag"
                    width={24}
                    height={17}
                  />
                </Box>
                <CaretDown size={15} color="#fff" />
              </Button>

              <Menu
                anchorEl={anchorEl2}
                open={drop}
                onClose={langClose}
                PaperProps={{
                  sx: {
                    minWidth: 150,
                    paddingY: 1,
                    boxShadow: 2,
                    borderRadius: 2,
                  },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={langChoice} id="en" sx={{ gap: 1 }}>
                  <img
                    id="en"
                    src="/img/flag/langen.png"
                    width={24}
                    height={17}
                    alt="English"
                    onClick={langChoice}
                  />
                  {t("English")}
                </MenuItem>
                <MenuItem onClick={langChoice} id="kr" sx={{ gap: 1 }}>
                  <img
                    id="kr"
                    src="/img/flag/langkr.png"
                    width={24}
                    height={17}
                    alt="Korean"
                    onClick={langChoice}
                  />
                  {t("Korean")}
                </MenuItem>
                <MenuItem onClick={langChoice} id="ru" sx={{ gap: 1 }}>
                  <img
                    id="ru"
                    src="/img/flag/langru.png"
                    width={24}
                    height={17}
                    alt="Russian"
                    onClick={langChoice}
                  />
                  {t("Russian")}
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withRouter(Top);
