import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";
import LatestJobsCard from "../homepage/LatestJobsCard";
import RecentlyCard from "../common/RecentlyCard";

const RecentlyVisited: NextPage = () => {
  const device = useDeviceDetect();
  const [total, setTotal] = useState<number>(0);
  const [recently, setRecently] = useState<number[]>([1, 2, 3]);

  /** APOLLO REQUESTS **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <div>NESTAR MY FAVORITES MOBILE</div>;
  } else {
    return (
      <div id="my-favorites-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Recently Visited</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="favorites-list-box">
          {recently.map((recently, index) => (
            <RecentlyCard key={index} />
          ))}
          {/* <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Recently Visited Properties found!</p>
          </div> */}
        </Stack>

        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination page={1} count={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>
              Total {total} recently visited propert{total > 1 ? "ies" : "y"}
            </Typography>
          </Stack>
        </Stack>
      </div>
    );
  }
};

export default RecentlyVisited;
