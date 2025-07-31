import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  const device = useDeviceDetect();
  const [featured, setFeatured] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  if (device === "mobile") {
    return <div>FEATURED</div>;
  } else {
    return (
      <Stack className="featured-job-post">
        <Stack className="container">
          <Box className="featured-title">
            <span>
              Featured<span className="featured-txt">job post</span>{" "}
            </span>
            <Box className="show-all">
              <span>Show all jobs </span>
              <img src="/icons/Stroke.svg" alt="" />
            </Box>
          </Box>
          <Box className="featured-card">
            <Box className="featured-frame">
              {featured.map((category, index) => (
                <FeaturedCard key={index} />
              ))}
            </Box>
          </Box>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              count={10}
              variant="outlined"
              shape="circular"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                  width: "38px",
                  height: "38px",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default Featured;
