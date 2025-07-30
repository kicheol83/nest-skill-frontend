import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ServiceJobsCard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>ServiceJobs CARD</div>;
  } else {
    return (
      <Box className="jobs-card">
        <Box className="main-content">
          <Box className="card">
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
              <IconButton color="default">
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-cnt">120</Typography>
              <IconButton color="default"></IconButton>
              <FavoriteIcon sx={{color: "red"}} />
              <Typography className="view-cnt" sx={{ marginLeft: "8px" }}>
                200
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="payment">
          <Button className="payme">Payment</Button>
          <Button className="payme1">View</Button>
        </Box>
      </Box>
    );
  }
};

export default ServiceJobsCard;
