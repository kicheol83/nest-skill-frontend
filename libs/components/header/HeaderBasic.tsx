import { Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const HeaderBasic = () => {
  return (
    <>
      <Stack className="header-frame">
        <Box className="header-title">
          <div className="txt">
            <span className="find">Find your</span>
            <span className="provider">dream provider</span>
          </div>
          <img
            src="/img/profile/blue-bottom-line.svg"
            alt=""
            style={{ marginLeft: "233px", marginTop: "8px" }}
          />
          <span className="bot-txt">
            Find the dream companies you dream work for
          </span>
        </Box>
        <Box className="header-basic-search">
          <div className="search-bar-wrapper">
            <div className="input-wrapper">
              <SearchIcon className="input-icon" />
              <input
                type="text"
                placeholder="Fintech"
                className="search-input"
              />
            </div>
            <div className="input-wrapper">
              <AddLocationAltOutlinedIcon className="input-icon" />
              <input
                type="text"
                placeholder="Florence, Italy"
                className="search-input"
              />
            </div>
            <button className="search-button">Search</button>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default HeaderBasic;
