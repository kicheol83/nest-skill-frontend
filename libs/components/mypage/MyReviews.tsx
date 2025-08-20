import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
  InputAdornment,
  Stack,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { NextPage } from "next";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";
import { DELETE_MY_REVIEW, UPDATE_REVIEW } from "@/apollo/user/mutation";
import {
  CreateReviewInput,
  ReviewInquiry,
} from "@/libs/types/review-post/review.input";
import { Review } from "@/libs/types/review-post/review";
import { GET_REVIEW, GET_REVIEWS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
  sweetMixinErrorAlert,
} from "@/libs/sweetAlert";
import axios from "axios";
import { getJwtToken } from "@/libs/auth";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";
import Moment from "react-moment";

const ReviewDashboard: NextPage = ({
  initialInput,
  initialValues,
  ...props
}: any) => {
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const token = getJwtToken();
  const router = useRouter();
  const inputRef = useRef<any>(null);

  const [searchFilter, setSearchFilter] = useState<ReviewInquiry>(initialInput);
  const [insertReviewyData, setInsertReviewyData] =
    useState<CreateReviewInput>(initialValues);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(4);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const myReviews = reviews.filter((r) => r.memberId === user?._id);
  const myTotal = myReviews.length;

  /** APOLLO REQUESTS **/
  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [deleteMyReview] = useMutation(DELETE_MY_REVIEW);

  const { refetch: getReviewsRefetch } = useQuery(GET_REVIEWS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setReviews(data?.getReviews?.list);
      setTotal(data?.getReviews?.metaCounter[0]?.total ?? 0);
    },
  });

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
  };

  const deleteReviewHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to delete this review?")) {
        await deleteMyReview({ variables: { input: { id } } });
        await getReviewsRefetch({ input: searchFilter });
      }
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  };

  const updateReviewHandler = async () => {
    if (!selectedReview) return;
    try {
      await updateReview({
        variables: {
          input: {
            _id: selectedReview._id,
            reviewRating: rating,
            reviewComments: insertReviewyData.reviewComments,
            reviewImages: insertReviewyData.reviewImages,
          },
        },
      });
      await getReviewsRefetch({ input: searchFilter });
    } catch (err: any) {
      await sweetErrorHandling(err);
    } finally {
      setOpen(false); // har doim modal yopiladi
    }
  };

  async function uploadImages() {
    try {
      const formData = new FormData();
      const selectedFiles = inputRef.current.files;

      if (selectedFiles.length === 0) return false;
      if (selectedFiles.length > 5)
        throw new Error("Cannot upload more than 5 images!");

      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
            imagesUploader(files: $files, target: $target)
          }`,
          variables: {
            files: [null, null, null, null, null],
            target: "review",
          },
        })
      );
      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.files.0"],
          "1": ["variables.files.1"],
          "2": ["variables.files.2"],
          "3": ["variables.files.3"],
          "4": ["variables.files.4"],
        })
      );
      for (const key in selectedFiles) {
        if (/^\d+$/.test(key)) formData.append(`${key}`, selectedFiles[key]);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_GRAPHQL_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseImages = response.data.data.imagesUploader;
      setInsertReviewyData({
        ...insertReviewyData,
        reviewImages: responseImages,
      });
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }

  const handleRemoveImage = (idx: number) => {
    setInsertReviewyData((prev) => ({
      ...prev,
      reviewImages: (prev.reviewImages ?? []).filter((_, i) => i !== idx),
    }));
  };

  const handleClose = () => setOpen(false);

  return (
    <Box className="review-dashboard" p={2}>
      {/* NAVBAR */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography className="mypost" fontSize="20px" fontWeight={600}>
          My Post Reviews
        </Typography>
      </Box>

      {/* REVIEW CARD */}
      {reviews?.length === 0 ? (
        <div className={"no-data"}>
          <img src="/img/icons/icoAlert.svg" alt="" />
          <p>No Review found!</p>
        </div>
      ) : (
        myReviews.map((review: Review) => (
          <Card
            key={review._id}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mb: 2,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Avatar
              src={
                review.reviewImages?.[0]
                  ? `${process.env.REACT_APP_API_URL}/${review.reviewImages[0]}`
                  : "/img/review-img.jpg"
              }
              alt="Provider Image"
              sx={{ width: 64, height: 64, borderRadius: 2, mr: 2 }}
            />
            <Box flex={1}>
              <Typography variant="body2" color="text.secondary">
                <Moment format={"DD.MM.YY HH:mm"}>{review?.createdAt}</Moment>
              </Typography>
              <Typography fontWeight={600}>{review.reviewComments}</Typography>
              <Rating value={review.reviewRating} readOnly size="small" />
            </Box>

            {/* ACTIONS */}
            {user?._id === review.memberId && (
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedReview(review);
                    setInsertReviewyData({
                      reviewRating: review.reviewRating,
                      reviewComments: review.reviewComments,
                      reviewImages: review.reviewImages,
                    });
                    setRating(review.reviewRating);
                    setOpen(true);
                  }}
                >
                  <Edit color="success" />
                </IconButton>
                <IconButton
                  onClick={() => deleteReviewHandler(review._id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Card>
        ))
      )}

      {reviews.length !== 0 && (
        <Stack className="pagination-config-review">
          <Stack className="pagination-box">
            <Pagination
              count={Math.ceil(myTotal / searchFilter.limit)}
              page={searchFilter.page}
              shape="circular"
              color="primary"
              onChange={paginationHandler}
            />
          </Stack>
          <Stack className="total-result">
            <Typography>{myTotal} reviews available</Typography>
          </Stack>
        </Stack>
      )}

      {/* EDIT MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
          }}
        >
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            sx={{
              background: "rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              padding: "5px 7px",
            }}
          >
            <Typography fontSize="18px" fontWeight={600} color="dark">
              Edit Your Review
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          {/* RATING */}
          <Rating
            value={rating}
            size="large"
            onChange={(_, value) => setRating(value)}
            sx={{ mb: 2 }}
          />

          {/* COMMENTS */}
          <TextField
            hiddenLabel
            value={insertReviewyData.reviewComments}
            onChange={(e) =>
              setInsertReviewyData({
                ...insertReviewyData,
                reviewComments: e.target.value,
              })
            }
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EditIcon sx={{ color: "gray" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* IMAGE UPLOAD */}
          <Box mb={2}>
            <Button
              variant="contained"
              component="label"
              sx={{
                mb: 2,
                background: "green",
                color: "white",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Upload Images
              <input
                ref={inputRef}
                type="file"
                hidden
                multiple
                accept="image/jpg, image/jpeg, image/png"
                onChange={uploadImages}
              />
            </Button>

            <Box display="flex" gap={1} flexWrap="wrap">
              {insertReviewyData.reviewImages?.map(
                (image: string, idx: number) => {
                  const imagePath = image.includes("http")
                    ? image
                    : `${process.env.REACT_APP_API_URL}/${image}`;

                  return (
                    <Stack
                      key={idx}
                      className="image-box"
                      sx={{ position: "relative", width: 80, height: 80 }}
                    >
                      <img
                        src={imagePath}
                        alt={`preview-${idx}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
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
                        <Close fontSize="small" />
                      </IconButton>
                    </Stack>
                  );
                }
              )}
            </Box>
          </Box>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ background: "green", color: "white" }}
              onClick={updateReviewHandler}
            >
              Update
            </Button>
            <Button variant="outlined" fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

ReviewDashboard.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    directions: "DESC",
    search: { memberId: "" },
  },
  initialValues: { reviewRating: 0, reviewComments: "", reviewImages: [] },
};

export default ReviewDashboard;
