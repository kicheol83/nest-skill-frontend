import {
  Box,
  Button,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useRouter, withRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import React, { useEffect, useState, useCallback } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "../config";
import { AccountCircle, Logout } from "@mui/icons-material";
import { NotificationBell } from "./socket/Notifications";

const Top = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const { t } = useTranslation("common");
  const [lang, setLang] = useState<string | null>("en");
  const [colorChange, setColorChange] = useState(false);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const langOpen = Boolean(anchorElLang);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const langClick = (e: any) => setAnchorElLang(e.currentTarget);
  const langClose = () => setAnchorElLang(null);
  const profileOpen = Boolean(anchorElProfile);
  const [bgColor, setBgColor] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState(true);

  const avatarSrc = user?.memberImage
    ? user.memberImage.startsWith("http") // yoki "https"
      ? user.memberImage
      : `${REACT_APP_API_URL}/${user.memberImage}`
    : "/img/profile/defaultUser.svg";

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      updateUserInfo(token);
      setUserLoading(false);
    } else {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("locale") === null) {
      localStorage.setItem("locale", "en");
      setLang("en");
    } else {
      setLang(localStorage.getItem("locale"));
    }
  }, [router]);

  useEffect(() => {
    switch (router.pathname) {
      case "/provider/detail":
        setBgColor(true);
        break;
      default:
        break;
    }
  }, [router]);

  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);
  }, []);

  const langChoice = useCallback(
    async (e: any) => {
      setLang(e.target.id);
      localStorage.setItem("locale", e.target.id);
      setAnchorElLang(null);
      await router.push(router.asPath, router.asPath, { locale: e.target.id });
    },
    [router]
  );

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(e.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    logOut();
  };

  useEffect(() => {
    const handleScroll = () => setColorChange(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Stack className="navbar">
      <Stack className={`navbar-main ${colorChange ? "scrolled" : ""}`}>
        <Stack className="container">
          <Box component="div" className="logo-box">
            <Link href="/" className="logo">
              <img src="/icons/nest-logo.svg" alt="Logo" />
              <p>Skill Nest</p>
            </Link>
          </Box>

          <Box component="div" className="router-box">
            <Link href="/">
              <div>{t("Home")}</div>
            </Link>
            <Link href="/service">
              <div>{t("Service")}</div>
            </Link>
            <Link href="/provider">
              <div>{t("Provider")}</div>
            </Link>
            <Link href="/community?articleCategory=FREE">
              <div>{t("Community")}</div>
            </Link>
            {user?._id && (
              <Link href={"/mypage"}>
                <div>{t("My Page")}</div>
              </Link>
            )}
            <Link href="/cs">
              <div>{t("CS")}</div>
            </Link>
          </Box>

          <Box className="user-box">
            {!user?._id && userLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 32,
                  width: 32,
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : user?._id ? (
              <>
                <Box
                  className="auth-box"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleProfileClick}
                >
                  <div className="login-user">
                    <img
                      src={avatarSrc}
                      alt=""
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Box>
                <Menu
                  anchorEl={anchorElProfile}
                  open={profileOpen}
                  onClose={handleProfileClose}
                  PaperProps={{
                    sx: { minWidth: 150, paddingY: 1, borderRadius: 2, ml: 4 },
                  }}
                >
                  <MenuItem
                    onClick={() => router.push("/mypage")}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(9, 110, 242, 0.23)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle
                        fontSize="small"
                        sx={{ color: "#1976d2" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("My Page")} />
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(255,0,0,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("Logout")} />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box className="auth-box">
                <Box className="user-avatar">
                  <AccountCircleIcon
                    sx={{ color: "white", marginRight: "5px" }}
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
            )}

            <Box className="lang-box">
              {user?._id && <NotificationBell />}
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
                anchorEl={anchorElLang}
                open={langOpen}
                onClose={langClose}
                PaperProps={{
                  sx: { minWidth: 150, paddingY: 1, borderRadius: 2 },
                }}
              >
                <MenuItem onClick={langChoice} id="en" sx={{ gap: 1 }}>
                  <img
                    id="en"
                    src="/img/flag/langen.png"
                    width={24}
                    height={17}
                    alt="English"
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
