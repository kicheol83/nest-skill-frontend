import { Box, Button, Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
const HeaderProviderDetail = () => {
  const [isOnline, setIsOnline] = useState(true);
  return (
    <>
      <Stack className="provider-detail">
        <Stack className="container">
          <span className="router">Provider/Detail</span>
          <Stack className="provider-frame">
            <img src="/img/banner/d.avif" alt="" />
            <Box className="provider-info">
              <Box className="provider-name">
                <span>David Johns</span>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  marginLeft={2}
                >
                  <FiberManualRecordIcon
                    fontSize="small"
                    sx={{ color: isOnline ? "green" : "gray" }}
                  />
                  <Typography variant="body2">
                    {isOnline ? "Online" : "Offline"}
                  </Typography>
                </Stack>
              </Box>
              <Typography className="title-header">
                Harkat maglubiyat va yana harakat va galaba
              </Typography>
              <Box className="information-wrapper">
                <Box className="information-bot">
                  <Box className="info-box">
                    <img src="/img/job/fire.svg" alt="" />
                    <div className="text">
                      <span className="title-top">Founded</span>
                      <span className="title-bot">Avgust 1, 2025</span>
                    </div>
                  </Box>
                </Box>

                <Box className="information-bot">
                  <Box className="info-box">
                    <img src="/img/job/people.svg" alt="" />
                    <div className="text">
                      <span className="title-top">Employees</span>
                      <span className="title-bot">4000</span>
                    </div>
                  </Box>
                </Box>

                <Box className="information-bot">
                  <Box className="info-box">
                    <img src="/img/job/location.svg" alt="" />
                    <div className="text">
                      <span className="title-top">Location</span>
                      <span className="title-bot">SEOUL</span>
                    </div>
                  </Box>
                </Box>

                <Box className="information-bot">
                  <Box className="info-box">
                    <img src="/img/job/industry.svg" alt="" />
                    <div className="text">
                      <span className="title-top">Industry</span>
                      <span className="title-bot">Payment, Gatway</span>
                    </div>
                  </Box>
                </Box>
                <Box className="banner">
                <div className="rec1"></div>
                <div className="rec2"></div>
                <div className="rec3"></div>
                <div className="rec4"></div>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderProviderDetail;
