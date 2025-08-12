import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReviewInquiry } from "@/libs/types/review-post/review.input";
import { Review } from "@/libs/types/review-post/review";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";

interface ReviewProps {
  initialInput: ReviewInquiry;
}

const ReviewPost = (props: ReviewProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const [review, setReview] = useState<Review[]>([]);

  /** APOLLO REQUEST **/

  const {
    loading: getReviewPostLoading,
    data: getReviewPostData,
    error: getReviewPostError,
    refetch: getReviewPostRefetch,
  } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: { input: initialInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setReview(data?.getReviews?.list || []);
    },
  });

  if (review) console.log("review: +++", review);
  if (!review) return null;

  if (device === "mobile") {
    return <div>CATEGORY</div>;
  } else {
    return (
      <Stack className="review">
        <Stack className="container">
          <Box className="review-title">
            <span>
              Clients<span className="review-txt">Testimonial</span>
            </span>
          </Box>

          <Stack className="review-card-box">
            {review.length === 0 ? (
              <Box className="empty-list">Trends Empty</Box>
            ) : (
              <Swiper
                className="popular-review-swiper"
                slidesPerView={"auto"}
                spaceBetween={15}
                loop={false}
                navigation={{
                  nextEl: ".swiper-review-next",
                  prevEl: ".swiper-review-prev",
                }}
                pagination={{
                  el: ".swiper-review-pagination",
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                observer={true}
                observeParents={true}
              >
                {review.map((review: Review) => (
                  <SwiperSlide key={review._id} className="review-cards-slide">
                    <ReviewCard review={review} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Stack>

          <Stack
            className="pagination-box"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            sx={{ gap: "14px" }}
          >
            <WestIcon
              className="swiper-review-prev"
              sx={{ marginLeft: "40%" }}
            />
            <div
              className="swiper-review-pagination"
              style={{ marginLeft: "5.5%" }}
            ></div>
            <EastIcon
              className="swiper-review-next"
              sx={{ marginRight: "40%" }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

ReviewPost.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default ReviewPost;
