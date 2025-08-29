import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface ProviderBigCard {
  providerPost: ProviderPost;
  likeProviderPostHandler: any;
}

const ProviderPostCard = (props: ProviderBigCard) => {
  const { providerPost, likeProviderPostHandler } = props;
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();

  /** HANDLERS **/
  const goProviderPostDetatilPage = (providerPostId: string) => {
    router.push(`/service/detail?id=${providerPostId}`);
  };
  return (
    <Card className="provider-post-card">
      <Box className="media-wrapper">
        <CardMedia
          component="img"
          height="200"
          image={`${REACT_APP_API_URL}/${providerPost?.providerImages?.[0]}`}
          alt=""
          onClick={() => goProviderPostDetatilPage(providerPost._id)}
        />
        <Chip
          label={`$${providerPost?.providerWorkPrice}`}
          className="price-chip"
        />
      </Box>

      <CardContent className="content">
        <Typography variant="h6" className="title">
          {providerPost?.providerTitle}
        </Typography>

        <Box className="location">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {providerPost?.providerLocation}
          </Typography>
        </Box>

        <Box className="info-grid">
          <Box className="info-item">
            <CategoryIcon fontSize="small" />
            <span>{providerPost?.providerType}</span>
          </Box>
          <Box className="info-item">
            <WorkIcon fontSize="small" />
            <span>{providerPost?.providerLevel}</span>
          </Box>
          <Box className="info-item">
            <CalendarTodayIcon fontSize="small" />
            <span> {providerPost?.providerWorkDayLimit} days</span>
          </Box>
          <Box className="info-item">
            <AccessTimeIcon fontSize="small" />
            <span>
              {providerPost?.providerStartTime} -{" "}
              {providerPost?.providerEndTime}
            </span>
          </Box>
          <Box className="info-item">
            <HomeIcon fontSize="small" />
            <span>{providerPost?.providerAddress}</span>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} className="stats">
          <Box className="view-like">
            <Box
              className="statItem"
              onClick={() => likeProviderPostHandler(user, providerPost?._id)}
            >
              {providerPost?.meLiked && providerPost?.meLiked[0]?.myFavorite ? (
                <FavoriteIcon
                  className="icon"
                  fontSize="small"
                  sx={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
              )}

              <Typography>{providerPost.providerLikes}</Typography>
            </Box>
            <Box className="statItem1">
              <VisibilityOutlinedIcon className="icon" fontSize="small" />
              <Typography>{providerPost.providerViews}</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProviderPostCard;
