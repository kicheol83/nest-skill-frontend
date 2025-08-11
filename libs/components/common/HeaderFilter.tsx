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
import { ProviderInquiry } from "@/libs/types/member/member.input";

interface HeaderFilterProps {
  initialInput: ProviderInquiry;
}

const HeaderFilter = () => {
  return (
    <>
      <Stack className="job-search-bar">
        <Box className="search-fields">
          <TextField
            sx={{
              height: "56px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#007aff",
                },
              },
            }}
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
            sx={{
              height: "56px",
              "&.MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#007aff",
                },
              },
            }}
            defaultValue="SEOUL"
            className="location-select"
            displayEmpty
            startAdornment={<RoomOutlinedIcon className="location-icon" />}
          >
            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#67a0f5a9",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="SEOUL"
            >
              SEOUL
            </MenuItem>
            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="BUSAN"
            >
              BUSAN
            </MenuItem>
            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="INCHEON"
            >
              INCHEON
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="DAEGU"
            >
              DAEGU
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="GYEONGJU"
            >
              GYEONGJU
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="GWANGJU"
            >
              GWANGJU
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="CHONJU"
            >
              CHONJU
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="DAEJON"
            >
              DAEJON
            </MenuItem>

            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e6f0ff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#d0e7ff",
                },
              }}
              value="JEJU"
            >
              JEJU
            </MenuItem>
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
    </>
  );
};

export default HeaderFilter;
