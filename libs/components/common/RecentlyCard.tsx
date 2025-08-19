import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
interface RecentlyCardProps {
  providerPost: ProviderPost;
  likeProviderHandler?: any;
  myFavorites?: boolean;
  recentlyVisited?: boolean;
}

const RecentlyCard = (props: RecentlyCardProps) => {
  const { providerPost, likeProviderHandler, myFavorites, recentlyVisited } =
    props;
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack className="recently-card">
        <Box className="latest-box">
          <Avatar
            alt="Remy Sharp"
            src="/img/profile/men.webp"
            sx={{ width: 64, height: 64, margin: "0px 4px" }}
          />
          <Box className="box-title">
            <span className="p-type">{providerPost.providerTitle}</span>
            <Stack
              className="title-location"
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span>{providerPost.providerRateType}</span>
              <img src="/img/job/black.svg" alt="" />
              <span>{providerPost.providerLocation}</span>
            </Stack>
          </Box>
        </Box>
        <Box className="bot-buttons">
          <Button className="button1">
            {providerPost.providerWorkWeekday}
          </Button>
          <div className="line"></div>
          <Button className="button2">{providerPost.providerLevel}</Button>
          <Button className="button3">{providerPost.providerType}</Button>
        </Box>
      </Stack>
    );
  }
};

export default RecentlyCard;
