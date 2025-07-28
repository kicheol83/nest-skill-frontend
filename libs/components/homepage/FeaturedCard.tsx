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
          <IconButton color="default">
            <RemoveRedEyeIcon />
          </IconButton>
          <Typography className="view-cnt">120</Typography>
          <IconButton color="default"></IconButton>
          <FavoriteIcon />
          <Typography className="view-cnt" sx={{marginLeft: "8px"}}>200</Typography>
        </Box>
      </Stack>
    );
  }
};

export default FeaturedCard;
