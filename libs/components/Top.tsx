import { Box, Button, Link, Menu, MenuItem, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import React, { useEffect, useState, useCallback } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Top = () => {
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [lang, setLang] = useState<string>("en"); // Default 'en'
  const drop = Boolean(anchorEl2);
  const [colorChange, setColorChange] = useState(false);

  // Load language from localStorage on first render
  useEffect(() => {
    const savedLang = localStorage.getItem("locale");
    if (savedLang) {
      setLang(savedLang);
    } else {
      localStorage.setItem("locale", "en");
    }
  }, []);

  const langClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(e.currentTarget);
  };

  const langClose = () => {
    setAnchorEl2(null);
  };

  const langChoice = useCallback(
    async (e: any) => {
      const selectedLang = e.target.id;
      setLang(selectedLang);
      localStorage.setItem("locale", selectedLang);
      setAnchorEl2(null);
      await router.push(router.asPath, router.asPath, { locale: selectedLang });
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
            <Link href="/" className="logo">
              <img
                src="/icons/nest-logo.svg"
                alt="Logo"
              />
              <p>Skill Nest</p>
            </Link>
          </Box>

          {/* Router links */}
          <Box component="div" className="router-box">
            {["Home", "Service", "Provider", "Community", "My Page", "CS"].map(
              (label) => (
                <Link
                  key={label}
                  href={
                    label === "Home"
                      ? "/"
                      : `/${label.toLowerCase().replace(" ", "-")}`
                  }
                >
                  <div>{label}</div>
                </Link>
              )
            )}
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
                Login
              </Link>
              <span className="divider">|</span>
              <Link href="/account/join" className="auth-link">
                Signup
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
                    src="/img/flag/langen.png"
                    width={24}
                    height={17}
                    alt="English"
                  />
                  English
                </MenuItem>
                <MenuItem onClick={langChoice} id="kr" sx={{ gap: 1 }}>
                  <img
                    src="/img/flag/langkr.png"
                    width={24}
                    height={17}
                    alt="Korean"
                  />
                  Korean
                </MenuItem>
                <MenuItem onClick={langChoice} id="ru" sx={{ gap: 1 }}>
                  <img
                    src="/img/flag/langru.png"
                    width={24}
                    height={17}
                    alt="Russian"
                  />
                  Russian
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Top;
