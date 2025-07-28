import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack } from "@mui/material";

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
        </Box>
      </Stack>
    );
  }
};

export default LatestJobsCard;
