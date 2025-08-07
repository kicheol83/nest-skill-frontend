import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { MyProviderCard } from "../mypage/MyProviderPostCard";

const MemberPosts: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  if (device === "mobile") {
    return <div>NESTAR PROPERTIES MOBILE</div>;
  } else {
    return (
      <div id="member-properties-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Properties</Typography>
          </Stack>
        </Stack>
        <Stack className="properties-list-box">
          <Stack className="list-box">
            <Stack className="listing-title-box">
              <Typography className="title-text">Listing title</Typography>
              <Typography className="title-text">Date Published</Typography>
              <Typography className="title-text">Status</Typography>
              <Typography className="title-text">View</Typography>
            </Stack>
            {/* <div className={"no-data"}>
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Property found!</p>
            </div> */}

            <MyProviderCard />

            <Stack className="pagination-config">
              <Stack className="pagination-box">
                <Pagination
                  count={1}
                  page={10}
                  shape="circular"
                  color="primary"
                />
              </Stack>
              <Stack className="total-result">
                <Typography>{total} property available</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </div>
    );
  }
};

export default MemberPosts;
