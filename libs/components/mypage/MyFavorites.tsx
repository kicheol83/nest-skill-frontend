import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";
import FeaturedCard from "../homepage/FeaturedCard";

const MyFavorites: NextPage = () => {
  const device = useDeviceDetect();
  const [total, setTotal] = useState<number>(0);
  const [featured, setFeatured] = useState<number[]>([1, 2, 3]);

  /** APOLLO REQUESTS **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <div>NESTAR MY FAVORITES MOBILE</div>;
  } else {
    return (
      <div id="my-favorites-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">My Favorites</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="favorites-list-box">
          {featured.map((category, index) => (
            <FeaturedCard key={index} />
          ))}
          {/* <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Favorites found!</p>
          </div> */}
        </Stack>

        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination page={1} count={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>
              Total {total} favorite propert{total > 1 ? "ies" : "y"}
            </Typography>
          </Stack>
        </Stack>
      </div>
    );
  }
};

export default MyFavorites;
