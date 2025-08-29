import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
} from "@mui/material";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { useRouter } from "next/router";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { REACT_APP_API_URL } from "@/libs/config";

interface ServiceJobsCardProps {
  providerPost: ProviderPost;
  likeProviderPostHandler: any;
}

export default function ServiceCards(props: ServiceJobsCardProps) {
  const { providerPost, likeProviderPostHandler } = props;
  const router = useRouter();
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);

  /** HANDLERS **/
  const pushDetailHandler = async (orderId: string) => {
    await router.push({
      pathname: "/order",
      query: { id: orderId },
    });
  };

  const pushDetailHandler1 = async (serviceJobId: string) => {
    await router.push({
      pathname: "/service/detail",
      query: { id: serviceJobId },
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card
        key={providerPost._id}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {/* Rasm */}
        <CardMedia
          component="img"
          sx={{
            width: 282,
            height: 198,
            objectFit: "cover",
          }}
          image={
            providerPost?.providerImages?.[0]
              ? `${REACT_APP_API_URL}/${providerPost.providerImages[0]}`
              : "/icons/default-avatar.jpg"
          }
          alt={providerPost.providerTitle}
        />

        {/* Content */}
        <CardContent
          sx={{
            flex: "1 1 auto",
            "&:last-child": { paddingBottom: "14px" }, // siz aytgandek padding
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "Space Grotesk",
            }}
            onClick={() => pushDetailHandler1(providerPost._id)}
          >
            {providerPost?.providerTitle}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Space Grotesk",
            }}
            onClick={() => pushDetailHandler1(providerPost._id)}
          >
            {providerPost?.providerDesc}
          </Typography>

          {/* Info Box (Sheet o‘rniga Paper ishlatyapmiz) */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontFamily: "Space Grotesk" }}
              >
                Rate Type:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "Space Grotesk" }}
              >
                {providerPost?.providerRateType}
              </Typography>
            </div>
            <div>
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontFamily: "Space Grotesk" }}
              >
                Location:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "Space Grotesk" }}
              >
                {providerPost?.providerLocation}
              </Typography>
            </div>
            <div>
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontFamily: "Space Grotesk" }}
              >
                Level:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "Space Grotesk" }}
              >
                {providerPost?.providerLevel}
              </Typography>
            </div>
            <div>
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontFamily: "Space Grotesk" }}
              >
                Type:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "Space Grotesk" }}
              >
                {providerPost?.providerType}
              </Typography>
            </div>
          </Paper>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              onClick={() => pushDetailHandler1(providerPost._id)}
              variant="outlined"
              sx={{
                borderRadius: "10px",
                border: "1px solid gray",
                bgcolor: "#007aff",
                color: "#fff",
                "&:hover": { bgcolor: "#007aff" },
              }}
            >
              View
            </Button>
            <Button
              onClick={() => pushDetailHandler(providerPost._id)}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "10px",
                bgcolor: "green",
                color: "#fff",
                "&:hover": {
                  bgcolor: "green",
                },
              }}
            >
              Order
            </Button>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}
            >
              {/* Like */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: 0.5,
                }}
                onClick={() => likeProviderPostHandler(user, providerPost?._id)}
              >
                {providerPost?.meLiked?.[0]?.myFavorite ? (
                  <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
                <Typography variant="body2">
                  {providerPost?.providerLikes}
                </Typography>
              </Box>

              {/* Views */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <VisibilityOutlinedIcon fontSize="small" />
                <Typography variant="body2">
                  {providerPost?.providerViews}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
