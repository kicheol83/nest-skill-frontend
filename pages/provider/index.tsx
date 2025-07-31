import withLayoutProvider from "@/libs/components/layout/LayoutProvider";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  Pagination,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

import ProviderCard from "@/libs/components/provider/ProviderCard";

const Provider: NextPage = () => {
  const device = useDeviceDetect();
  const [sortOption, setSortOption] = useState("recent");
  const [provider, setProvider] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  const handleChange = (e: any) => {
    setSortOption(e.target.value);
  };

  if (device === "mobile") {
    return <Stack className={"home-page"}></Stack>;
  } else {
    return (
      <Stack className={"provider-page"}>
        <Stack className="container">
          <Box className="right-left">
            <Box className="right">
              <span className="text-top">All Providers</span>
              <span className="text-bott">Showing 112 results</span>
            </Box>
            <Box className="left">
              <Box display="flex" alignItems="center">
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
                  <MenuItem value="recent">Recent</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="likes">Likes</MenuItem>
                  <MenuItem value="view">View</MenuItem>
                  <MenuItem value="review">Review</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box className="card-frame">
            {provider.map((provider, index) => (
              <ProviderCard key={index} />
            ))}
          </Box>
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
    );
  }
};

export default withLayoutProvider(Provider);
