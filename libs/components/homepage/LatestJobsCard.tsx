import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const LatestJobsCard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack className="latest-card">
        <Box className="latest-box">
          <Avatar
            alt="Remy Sharp"
            src="/img/profile/men.webp"
            sx={{ width: 64, height: 64, margin: "0px 4px" }}
          />
          <Box className="box-title">
            <span className="p-type">Social Media Assistant</span>
            <Stack
              className="title-location"
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span>Revoult</span>
              <img src="/img/job/black.svg" alt="" />
              <span>Cheongju</span>
            </Stack>
          </Box>
        </Box>
        <Box className="bot-buttons">
          <Button className="button1">Full Time</Button>
          <div className="line"></div>
          <Button className="button2">SILVER</Button>
          <Button className="button3">ELECTRICIAN</Button>
          <Box className="view-like">
            <Box className="statItem">
              <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
              <Typography>11</Typography>
            </Box>
            <Box className="statItem1">
              <VisibilityOutlinedIcon className="icon" fontSize="small" />
              <Typography>10</Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  }
};

export default LatestJobsCard;
