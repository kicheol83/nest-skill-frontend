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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import PaidIcon from "@mui/icons-material/Paid";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";

const ProviderPostCard = () => {
  return (
    <Card className="provider-post-card">
      <Box className="media-wrapper">
        <CardMedia
          component="img"
          height="200"
          image="/img/banner/d.avif"
          alt=""
        />
        <Chip label="100$" className="price-chip" />
      </Box>

      <CardContent className="content">
        <Typography variant="h6" className="title">
          Eng zor provider post
        </Typography>

        <Box className="location">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">BUSAN</Typography>
        </Box>

        <Box className="info-grid">
          <Box className="info-item">
            <CategoryIcon fontSize="small" />
            <span>PHOTOGRAPH</span>
          </Box>
          <Box className="info-item">
            <WorkIcon fontSize="small" />
            <span>GOLD</span>
          </Box>
          <Box className="info-item">
            <CalendarTodayIcon fontSize="small" />
            <span> 5 days</span>
          </Box>
          <Box className="info-item">
            <AccessTimeIcon fontSize="small" />
            <span>06:00 - 16:00</span>
          </Box>
          <Box className="info-item">
            <HomeIcon fontSize="small" />
            <span>Seowon-Dong 66-110</span>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} className="stats">
          <Box className="stat">
            <VisibilityIcon fontSize="small" />
            <span style={{ marginTop: "2px" }}>11</span>
          </Box>
          <Box className="stat">
            <FavoriteBorderIcon fontSize="small" />
            <span style={{ marginTop: "2px" }}>12</span>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProviderPostCard;
