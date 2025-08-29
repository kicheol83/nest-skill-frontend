import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";

interface LatestCardProps {
  latest: ProviderPost;
  likeLatestHandler: any;
}

export default function UserCard(props: LatestCardProps) {
  const { latest, likeLatestHandler } = props;
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const pushDetailHandler = async (latestId: string) => {
    await router.push({
      pathname: "/service/detail",
      query: { id: latestId },
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "50%",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 182 },
          height: "207px",
          objectFit: "cover",
        }}
        image={
          latest?.providerImages?.[0]
            ? `${REACT_APP_API_URL}/${latest.providerImages[0]}`
            : "/icons/default-avatar.jpg"
        }
        alt={latest.providerTitle}
      />

      <CardContent
        sx={{
          "&:last-child": {
            paddingBottom: "14px",
          },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          onClick={() => pushDetailHandler(latest._id)}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            sx={{ fontSize: "23px", fontFamily: "Space Grotesk" }}
            variant="h6"
            fontWeight={600}
          >
            {latest.providerTitle}
          </Typography>
          <Typography
            sx={{ fontFamily: "Space Grotesk" }}
            variant="body2"
            color="text.secondary"
          >
            {latest.providerDesc}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
          <Box flex={1}>
            <Typography
              sx={{ fontFamily: "Space Grotesk" }}
              variant="caption"
              color="text.secondary"
            >
              Location
            </Typography>
            <Typography sx={{ fontFamily: "Space Grotesk" }} variant="body2">
              {latest.providerLocation}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              sx={{ fontFamily: "Space Grotesk" }}
              variant="caption"
              color="text.secondary"
            >
              Rate Type
            </Typography>
            <Typography sx={{ fontFamily: "Space Grotesk" }} variant="body2">
              {latest.providerRateType}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              sx={{ fontFamily: "Space Grotesk" }}
              variant="caption"
              color="text.secondary"
            >
              Type
            </Typography>
            <Typography sx={{ fontFamily: "Space Grotesk" }} variant="body2">
              {latest.providerType}
            </Typography>
          </Box>
        </Stack>

        <Stack
          sx={{ marginLeft: "auto" }}
          direction="row"
          spacing={1}
          mt="auto"
        >
          <Button
            sx={{
              borderRadius: "10px",
              border: "1px solid",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
            variant="outlined"
            startIcon={
              latest?.meLiked?.[0]?.myFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )
            }
            onClick={() => likeLatestHandler(user, latest._id)}
          >
            {latest.providerLikes}
          </Button>

          <Button
            sx={{
              borderRadius: "10px",
              border: "1px solid",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
            variant="outlined"
            startIcon={<VisibilityOutlinedIcon />}
          >
            {latest.providerViews}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
