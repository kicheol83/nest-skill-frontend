import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const CommunityCard = () => {
  return (
    <Card className="postCard">
      <Box className="imageWrapper">
        <img src="/img/banner/d.avif" alt="" className="cardImage" />
        <Box className="dateBox">
          <Typography variant="body2" className="month">
            Avgust
          </Typography>
          <Typography variant="h6" className="day">
            2025.06.07
          </Typography>
        </Box>
      </Box>
      <CardContent className="cardContent">
        <Typography variant="subtitle1" className="title">
          ADMIN
        </Typography>
        <Typography variant="body2" className="category">
          the best article in side
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
