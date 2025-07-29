import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Stack } from "@mui/material";
import { Rating, Typography } from "@mui/material";
import { useState } from "react";

const ReviewCard = () => {
  const device = useDeviceDetect();
  const [value, setValue] = useState<number | null>(5);

  if (device === "mobile") {
    return <div>REVIEW CARD</div>;
  } else {
    return (
      <Stack className="review-box">
        <Box className="review-info">
          <Rating value={value} readOnly size="medium" />
          <span className="title-review">
            “Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac
            placerat metus, in faucibus est.”
          </span>
        </Box>
        <Box className="avatar">
          <Avatar
            alt="Remy Sharp"
            src="/img/profile/men.webp"
            sx={{ width: 48, height: 48 }}
          />
          <Box className="name">
            <span className="user-name">Robert Fox</span>
            <span className="user-title">UI|UX Designer</span>
            <img src="/img/job/circle.svg" alt="" />
          </Box>
        </Box>
      </Stack>
    );
  }
};

export default ReviewCard;
