// components/ReviewDashboard.tsx

import {
  Box,
  Card,
  Typography,
  IconButton,
  Avatar,
  Rating,
  Button,
  Menu,
  MenuItem,
  TextField,
  Input,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";

const ReviewDashboard = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setEditingReviewId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditingReviewId(null);
  };

  return (
    <Box className="review-dashboard">
      {/* NAVBAR */}
      <Box className="review-navbar">
        <Typography className="review-post-title">
         My Post Reviews
        </Typography>
        <Box className="review-info">
          <Typography className="review-count">3 Reviews</Typography>
          <Typography className="review-updated">
            Last updated: 2025-08-05
          </Typography>
        </Box>
      </Box>

      {/* REVIEW CARDS */}
      <Box className="review-cards">
        {[1, 2, 3].map((reviewId) => (
          <Card className="review-card" key={reviewId}>
            <Avatar
              src="/img/banner/d.avif"
              alt="Provider Image"
              className="review-image"
            />
            <Box className="review-content">
              <Typography className="review-type">Cleaning</Typography>
              <Typography className="review-title">
                Bathroom Deep Clean
              </Typography>
              <Rating value={4} readOnly size="small" />
              <Typography className="review-description">
                They did a fantastic job! Quick and detailed service.
              </Typography>
              {/* <Box className="review-uploaded-img">
                <Image
                  src="/img/banner/d.avif"
                  alt="Review"
                  width={100}
                  height={100}
                />
                  <Image
                  src="/img/banner/d.avif"
                  alt="Review"
                  width={100}
                  height={100}
                />
              </Box> */}
            </Box>

            {/* ACTION BUTTONS */}
            <Box className="review-actions">
              <IconButton
                onClick={(e) => handleEditClick(e, reviewId)}
                className="edit-btn"
              >
                <Edit />
              </IconButton>
              <IconButton className="delete-btn">
                <Delete />
              </IconButton>
            </Box>

            {/* EDIT MENU */}
            {editingReviewId === reviewId && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="edit-menu"
              >
                <Box
                  className="edit-form"
                  sx={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "25px",
                  }}
                >
                  <Typography
                    className="edit-title"
                    sx={{ fontFamily: "cursive", marginTop: "15px" }}
                  >
                    Edit Your Review
                  </Typography>
                  <Rating
                    defaultValue={4}
                    size="medium"
                    className="edit-rating"
                  />
                  <input
                    placeholder="description"
                    className="edit-description"
                    style={{
                      width: "335px",
                      height: "50px",
                      borderRadius: "18px",
                    }}
                  />
                  {/* Image Upload + Preview */}
                  {/* <Box className="edit-image-section">
                    <label htmlFor="upload-photo" className="edit-image-label">
                      <input
                        type="file"
                        id="upload-photo"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const img = document.getElementById(
                                "preview-img"
                              ) as HTMLImageElement;
                              if (img) img.src = reader.result as string;
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Box className="edit-image-preview">
                        <img id="preview-img" alt="Uploaded" />
                        <Typography>Click to upload image</Typography>
                      </Box>
                    </label>
                  </Box> */}
                  {/* Buttons */}
                  <Box
                    className="edit-buttons"
                    sx={{ gap: "10px", marginBottom: "10px", display: "flex" }}
                  >
                    <Button
                      className="update-btn"
                      sx={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        marginRight: "20px",
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="cancel-btn"
                      variant="outlined"
                      color="secondary"
                      onClick={handleClose}
                      sx={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        marginRight: "20px",
                        height: "30px",
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Menu>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewDashboard;
