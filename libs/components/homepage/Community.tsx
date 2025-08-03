import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Link, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CommunityCard from "./CommunityCard";
import MediaCard from "./CommunityCard";
import FlippingCards from "./CommunityCard";

const CommunityBoard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>COMMUNITY BOARDS (MOBILE)</div>;
  } else {
    return (
      <Stack className={"community-board"}>
        <Stack className={"container"}>
          <Stack className="community-title">
            <span>
              COMMUNITY BOARD<span className="board-txt">HIGHLIGHTS</span>{" "}
            </span>
          </Stack>
          <div>
            <FlippingCards />
          </div>
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

export default CommunityBoard;
