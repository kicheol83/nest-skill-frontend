import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Review } from "@/libs/types/review-post/review";
import { Avatar, Box, Stack } from "@mui/material";
import { Rating, Typography } from "@mui/material";
import { useState } from "react";

interface ReviewPostCard {
  review: Review;
}

const ReviewCard = (props: ReviewPostCard) => {
  const { review } = props;
  const device = useDeviceDetect();
  const [value, setValue] = useState<number | null>(
    Math.min(5, Math.max(1, review.reviewRating ?? 1))
  );

  if (device === "mobile") {
    return <div>REVIEW CARD</div>;
  } else {
    return (
      <Stack className="review-box" key={review._id}>
        <Box className="review-info">
          <Rating value={value} readOnly size="medium" />
          <span className="title-review">{review.reviewComments}</span>
        </Box>
        <Box className="avatar">
          <Avatar
            alt="Remy Sharp"
            src="/img/profile/men.webp"
            sx={{ width: 48, height: 48 }}
          />
          <Box className="name">
            <span className="user-name">{review?.memberData?.memberNick}</span>
            <span className="user-title">{review?.memberData?.memberType}</span>
            <img src="/img/job/circle.svg" alt="" />
          </Box>
        </Box>
      </Stack>
    );
  }
};

export default ReviewCard;
