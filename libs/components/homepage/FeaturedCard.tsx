import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

interface FeaturedCardProps {
  featured: ProviderPost;
  likeFeaturedHandler: any;
  myFavorites?: boolean;
}

const FeaturedCard = (props: FeaturedCardProps) => {
  const { featured, likeFeaturedHandler, myFavorites } = props;
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
        <Box className="card-image">
          <img
            src={`${REACT_APP_API_URL}/${featured.providerImages[0]}`}
            alt={featured.providerType}
          />
          <span className="provider-type">{featured.providerType}</span>
        </Box>
        <Box className="card-content p-4">
          <Box
            onClick={() => pushDetailHandler(featured._id)}
            className="box-title"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={3}
              className="title-location"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                className="location-item"
              >
                <AccessTimeOutlinedIcon fontSize="medium" color="action" />
                <Typography
                  fontFamily={"Space Grotesk"}
                  variant="h5"
                  fontWeight={500}
                >
                  {featured.providerStartTime}: {featured.providerEndTime}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: "20px" }} />
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                className="location-item"
              >
                <PlaceOutlinedIcon fontSize="medium" color="action" />
                <Typography
                  fontFamily={"Space Grotesk"}
                  variant="h5"
                  fontWeight={500}
                >
                  {featured.providerLocation}
                </Typography>
              </Box>
            </Stack>
            <Typography
              variant="body1"
              mt={2}
              mb={2}
              fontWeight={500}
              fontSize="16px"
              color="text.secondary"
              className="desc"
            >
              {featured.providerDesc}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            className="button"
          >
            <Button variant="contained" size="small" className="level">
              {featured.providerLevel}
            </Button>
            <Button variant="contained" size="small" className="level1">
              {featured.providerWorkPrice}$
            </Button>

            <Stack direction="row" spacing={2} className="view-like">
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
                className="statItem"
                onClick={() => likeFeaturedHandler(user, featured?._id)}
              >
                {myFavorites || featured?.meLiked?.[0]?.myFavorite ? (
                  <FavoriteIcon color="primary" />
                ) : (
                  <FavoriteBorderIcon />
                )}
                <Typography variant="body2">
                  {featured?.providerLikes}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
                className="statItem1"
              >
                <VisibilityOutlinedIcon />
                <Typography variant="body2">
                  {featured.providerViews}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    );
  }
};

export default FeaturedCard;
