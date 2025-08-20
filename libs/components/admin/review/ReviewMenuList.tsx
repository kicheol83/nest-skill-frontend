import React, { useState } from "react";
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  IconButton,
  Menu,
  Fade,
  MenuItem,
  Stack,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { Review } from "@/libs/types/review-post/review";

const headCells = [
  { id: "id", label: "REVIEW ID" },
  { id: "nickname", label: "NICK NAME" },
  { id: "rating", label: "RATING" },
  { id: "comments", label: "COMMENTS" },
  { id: "date", label: "DATE" },
  { id: "actions", label: "ACTIONS" },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ReviewPanelListType {
  reviews: Review[];
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateReviewHandler: any;
  removeReviewHandler: any;
}

export const ReviewPanelList = ({
  reviews,
  anchorEl,
  menuIconClickHandler,
  menuIconCloseHandler,
  updateReviewHandler,
  removeReviewHandler,
}: ReviewPanelListType) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setImages(review.reviewImages || []);
    setComment(review.reviewComments || "");
    setRating(review.reviewRating || 0);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReview(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!selectedReview) return;
    updateReviewHandler({
      _id: selectedReview._id,
      reviewComments: comment,
      reviewRating: rating,
      reviewImages: images,
    });
    handleCloseModal();
  };

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead />
          <TableBody>
            {reviews.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className="no-data">data not found!</span>
                </TableCell>
              </TableRow>
            )}

            {reviews.length > 0 &&
              reviews.map((review: Review, index: number) => (
                <TableRow
                  hover
                  key={review?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{review._id}</TableCell>
                  <TableCell align="center">
                    {review.memberData?.memberNick}
                  </TableCell>
                  <TableCell align="center">
                    <Rating
                      name="review-rating"
                      value={review.reviewRating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="center">{review.reviewComments}</TableCell>
                  <TableCell align="center">
                    {moment(review.createdAt).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => menuIconClickHandler(e, index)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={menuIconCloseHandler}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => handleOpenModal(review)}>
                        Update
                      </MenuItem>
                      <MenuItem
                        onClick={() => removeReviewHandler(review._id)}
                        sx={{ color: "red" }}
                      >
                        Remove
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* MODAL */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack gap={2}>
            <h2>Edit Review</h2>
            <TextField
              label={"comment"}
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
            <Rating
              name="edit-rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              precision={1}
            />
            <Stack direction="row" gap={2} flexWrap="wrap">
              {images.map((img: string, idx: number) => {
                const imagePath = img.includes("http")
                  ? img
                  : `${process.env.REACT_APP_API_URL}/${img}`;

                return (
                  <Box
                    key={idx}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 2,
                    }}
                  >
                    <img
                      src={imagePath}
                      alt={`review-img-${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                      }}
                      onClick={() => handleRemoveImage(idx)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>

            <Button variant="outlined" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
            </Button>

            <Stack direction="row" gap={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "green" }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
