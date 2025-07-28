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
            <img className="rec1" src="/img/rectangle/rec1.svg" alt="" />
            <img className="rec2" src="/img/rectangle/rec2.svg" alt="" />
            <img className="rec3" src="/img/rectangle/rec3.svg" alt="" />
            <img className="rec4" src="/rectangle/rec4.svg" alt="" />
            <img className="rec5" src="/img/rectangle/rec1.svg" alt="" />
          </Box>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              count={10}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1.2rem",
                  width: "48px",
                  height: "48px",
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
