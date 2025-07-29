import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Review = () => {
  const device = useDeviceDetect();
  const [review] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  if (device === "mobile") {
    return <div>CATEGORY</div>;
  }

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
              slidesPerView={4} // <-- Boshida 4 ta box
              spaceBetween={25}
              loop={false} // Avto aylanmasin
              navigation={{
                nextEl: ".swiper-review-next",
                prevEl: ".swiper-review-prev",
              }}
              pagination={{
                el: ".swiper-review-pagination",
                clickable: true,
              }}
              modules={[Navigation, Pagination]} // Autoplay kiritilmadi
              observer={true}
              observeParents={true}
            >
              {review.map((_, index) => (
                <SwiperSlide key={index} className="review-cards-slide">
                  <ReviewCard />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Stack>

        <Stack className="pagination-box" display={"flex"} flexDirection={"row"} >
          <WestIcon className="swiper-review-prev" sx={{marginLeft: "40%"}}/>
          <div className="swiper-review-pagination" style={{marginLeft: "5.5%"}}></div>
          <EastIcon className="swiper-review-next" sx={{marginRight: "40%"}} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Review;
