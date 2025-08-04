import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import LatestJobsCard from "./LatestJobsCard";

const LatestJobs = () => {
  const device = useDeviceDetect();
  const [latestJobs, setLatestJobs] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  if (device === "mobile") {
    return <div>CATEGORY</div>;
  } else {
    return (
      <Stack className="latest">
        <Stack className="container">
          <Box className="latest-title">
            <span>
              Latest<span className="latest-txt">jobs open</span>{" "}
            </span>
            <Box className="show-all">
              <span>Show all jobs </span>
              <img src="/icons/Stroke.svg" alt="" />
            </Box>
          </Box>
          <Box className="latest-card">
            <Box className="latest-frame">
              {latestJobs.map((category, index) => (
                <LatestJobsCard key={index} />
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

export default LatestJobs;
