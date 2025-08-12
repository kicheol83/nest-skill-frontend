import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface FeaturedCardProps {
  featured: ProviderPost;
  likeFeaturedHandler: any;
}

const FeaturedCard = (props: FeaturedCardProps) => {
  const { featured, likeFeaturedHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);

  /** HANDLERS **/
  const pushDetailHandler = async (featuredId: string) => {
    await router.push({
      pathname: "/service/detail",
      query: { id: featuredId },
    });
  };

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack className="featured-box" key={featured._id}>
        <Box className="top-info">
          <Avatar
            alt="Remy Sharp"
            src={`${REACT_APP_API_URL}/${featured.providerImages[0]}`}
            sx={{ width: 48, height: 48 }}
          />
          <Button className="info-button">
            {featured.providerWorkWeekday}
          </Button>
        </Box>
        <Box className="box-title">
          <span className="p-type">{featured.providerType}</span>
          <Stack
            className="title-location"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <span>{featured.providerRateType}</span>
            <img src="/img/job/black.svg" alt="" />
            <span>{featured.providerLocation}</span>
          </Stack>
          <span className="desc">{featured.providerDesc}</span>
        </Box>
        <Box className="button">
          <Button className="level">{featured.providerLevel}</Button>
          <Box className="view-like">
            <Box
              className="statItem"
              onClick={() => likeFeaturedHandler(user, featured?._id)}
            >
              {featured?.meLiked && featured?.meLiked[0]?.myFavorite ? (
                <FavoriteIcon
                  className="icon"
                  fontSize="small"
                  sx={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
              )}

              <Typography>{featured.providerLikes}</Typography>
            </Box>
            <Box className="statItem1">
              <VisibilityOutlinedIcon className="icon" fontSize="small" />
              <Typography>{featured.providerViews}</Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  }
};

export default FeaturedCard;
