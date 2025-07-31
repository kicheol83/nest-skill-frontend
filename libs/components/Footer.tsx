import { Box, Button, InputBase, Stack } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Stack className="footer-main">
      <Stack className="footer-frame">
        <Stack className="container">
          <Box className="app-name">
            <div className="skill-logo">
              {" "}
              <img
                src="/icons/nest-logo.svg"
                alt="Logo"
              />
              <p>Skill Nest</p>
            </div>
            <div className="title">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </div>
          </Box>
          <Box className="about">
            <span className="about-txt">About</span>
            <span className="text">Companies</span>
            <span className="text">Pricing</span>
            <span className="text">Terms</span>
            <span className="text">Advice</span>
            <span className="text">Privacy Policy</span>
          </Box>
          <Box className="about" sx={{ marginLeft: "165px" }}>
            <span className="about-txt">Resources</span>
            <span className="text">Help Docs</span>
            <span className="text">Guide</span>
            <span className="text">Updates</span>
            <span className="text">Contact Us</span>
          </Box>
          <Box className="get-job">
            <span className="job-title">Get job notifications</span>
            <span className="text">
              The latest job news, articles, sent to your inbox weekly.
            </span>
            <Box className="subscribe-wrapper">
              <InboxIcon className="subscribe-icon" />

              <InputBase
                placeholder="info@gmail.com"
                className="subscribe-input"
                inputProps={{ style: { color: "black" } }}
              />

              <Button className="subscribe-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="10"
                  viewBox="0 0 38 15"
                  className="subscribe-arrow"
                >
                  <path
                    fill="currentColor"
                    d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843..."
                  ></path>
                </svg>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Stack>

        <Stack className="container">
          <Box className="botton-txt">
            <div className="bot-line"></div>

            <div className="bot">
              <span>2025 @ Skill Nest. All rights reserved.</span>
              <div className="icons">
                <FacebookOutlinedIcon
                  sx={{ color: "white", marginLeft: "80px" }}
                />
                <TwitterIcon sx={{ color: "white", marginLeft: "10px" }} />
                <InstagramIcon sx={{ color: "white", marginLeft: "10px" }} />
                <LinkedInIcon sx={{ color: "white", marginLeft: "10px" }} />
                <GitHubIcon sx={{ color: "white", marginLeft: "10px" }} />
              </div>
            </div>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
