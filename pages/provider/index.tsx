import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

import ProviderCard from "@/libs/components/provider/ProviderCard";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import HeaderFilter from "@/libs/components/common/HeaderFilter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

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
          <Stack className="header-frame">
            <Box className="header-title">
              <div className="big-text">
                Find your<div className="blue-text">providers</div>
              </div>
              <img
                src="/img/profile/blue-bottom-line2.svg"
                alt=""
                style={{
                  marginLeft: "218px",
                  width: "262px",
                  marginTop: "-8px",
                }}
              />
              <span className="small-text">
                Find your next career at companies like HubSpot, Nike, and
                Dropbox
              </span>
            </Box>
            <Stack className="job-search-bar">
              <Box className="search-fields">
                <TextField
                  sx={{ height: "56px" }}
                  placeholder="Job title or keyword"
                  variant="outlined"
                  className="search-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Select
                  sx={{ height: "56px" }}
                  defaultValue="Florence, Italy"
                  className="location-select"
                  displayEmpty
                  startAdornment={
                    <RoomOutlinedIcon className="location-icon" />
                  }
                >
                  <MenuItem value="Florence, Italy">Provider Type</MenuItem>
                  <MenuItem value="Tashkent">PHOTOGRAPH</MenuItem>
                  <MenuItem value="Seoul">BABYSITTING</MenuItem>
                </Select>
                <Button
                  className="search-button"
                  variant="contained"
                  sx={{
                    height: "56px",
                    px: 3,
                    paddingX: "20px",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Search provider
                </Button>
              </Box>
            </Stack>
          </Stack>
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

export default withLayoutNew(Provider);
