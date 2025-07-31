import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const FeaturedCard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack className="featured-box">
        <Box className="top-info">
          <Avatar
            alt="Remy Sharp"
            src="/img/profile/men.webp"
            sx={{ width: 48, height: 48 }}
          />
          <Button className="info-button">Full Time</Button>
        </Box>
        <Box className="box-title">
          <span className="p-type">Babysitting</span>
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
          <span className="desc">
            ClassPass is looking for Product Designer to help us...
          </span>
        </Box>
        <Box className="button">
          <Button className="level">BRONZE</Button>
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

export default FeaturedCard;
