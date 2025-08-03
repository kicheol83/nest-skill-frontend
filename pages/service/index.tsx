import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Filter from "@/libs/components/service/Filter";
import ServiceJobsCard from "@/libs/components/service/ServiceJobsCard";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const ServicePage: NextPage = () => {
  const [sortOption, setSortOption] = useState("most_relevant");
  const [serviceJobs, setServiceJobs] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (spinning) return; // agar aylanish davom etsa, bosilishini bloklash

    setSpinning(true);

    // animatsiyani 1 soniya davomida ko‘rsatib tugatish
    setTimeout(() => {
      setSpinning(false);
      // shu yerda reset funksiyasini chaqiring, agar kerak bo‘lsa
    }, 1000);
  };

  const handleChange = (e: any) => {
    setSortOption(e.target.value);
  };
  return (
    <Stack className="service-page">
      <Stack className="container" marginTop={"78px"}>
        <Stack className="filter">
          <Filter />
        </Stack>
        <Stack className="service-frame">
          <Stack className="service-frame-main">
            <Box className="jobs-title">
              <Box className="right">
                <span className="text-top">All Jobs</span>
                <span className="text-bott">Showing 112 results</span>
              </Box>
              <Box className="left">
                <Box display="flex" alignItems="center" mr={"10px"}>
                  <Typography color="text.secondary" fontSize="14px" mr={1}>
                    Sort by:
                  </Typography>
                  <Select
                    value={sortOption}
                    onChange={handleChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                      boxShadow: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#1c1c2b",
                      "& .MuiSelect-icon": {
                        color: "#3d5afe",
                      },
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <MenuItem value="most_relevant">Most relevant</MenuItem>
                    <MenuItem value="recent">Most recent</MenuItem>
                    <MenuItem value="high_rating">Highest rated</MenuItem>
                    <MenuItem value="low_price">Lowest price</MenuItem>
                  </Select>
                </Box>
                <Box className="refresh-wrapper">
                  <button
                    onClick={handleClick}
                    className={`refresh-btn ${spinning ? "spinning" : ""}`}
                    aria-label="Reset"
                  >
                    <RefreshIcon />
                  </button>
                  <span className="tooltip">Reset</span>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box className="jobs-frame">
            {serviceJobs.map((jobs, index) => (
              <ServiceJobsCard key={index} />
            ))}
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
    </Stack>
  );
};

export default withLayoutBasic(ServicePage);
