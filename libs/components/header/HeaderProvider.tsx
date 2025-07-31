import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const HeaderProvider = () => {
  return (
    <>
      <Stack className="header-frame">
        <Box className="header-title">
          <div className="big-text">
            Find your<div className="blue-text">dreamjob</div>
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
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </span>
        </Box>
        <Box className="banner">
          <img className="rec1" src="/rectangle/rec1.svg" alt="" />
          <img className="rec2" src="/rectangle/rec2.svg" alt="" />
          <img className="rec3" src="/rectangle/rec3.svg" alt="" />
          <img className="rec4" src="/rectangle/rec4.svg" alt="" />
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
              startAdornment={<RoomOutlinedIcon className="location-icon" />}
            >
              <MenuItem value="Florence, Italy">Florence, Italy</MenuItem>
              <MenuItem value="Tashkent">Tashkent</MenuItem>
              <MenuItem value="Seoul">Seoul</MenuItem>
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
              Search my job
            </Button>
          </Box>

          <Box className="popular-keywords">
            Popular : Pet Service, Cleaner, IT Developer
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderProvider;
