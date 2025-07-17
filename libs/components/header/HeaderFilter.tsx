import { Box, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

const HeaderFilter = () => {
  return (
    <>
      <Stack className="search-box">
        <Stack className="select-box">
          <Box component={"div"} className="box on">
            <span>Location</span>
            <ExpandMoreIcon />
          </Box>
          <Box className="box">
            <span>Provider type</span>
            <ExpandMoreIcon />
          </Box>
          <Box className="box">
            <span>Price</span>
            <ExpandMoreIcon />
          </Box>
        </Stack>
        <Stack className="search-box-other">
          <Box className="advanced-filter">
            <TuneIcon sx={{marginRight: "5px"}}/>
            <span>Advanced</span>
          </Box>
          <Box className="search-btn">
            <img src="/img/icons/search_white.svg" alt="" />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderFilter;
