import React, { useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import ProviderPostCard from "../common/ProviderBigCard";
import { MyProviderCard } from "./MyProviderPostCard";

const MyPosts: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();

  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  /** APOLLO REQUESTS **/

  /** HANDLERS **/

  //   if (user?.memberType !== "AGENT") {
  //     router.back();
  //   }

  if (device === "mobile") {
    return <div>NESTAR PROPERTIES MOBILE</div>;
  } else {
    return (
      <div id="my-property-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">My Properties</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="property-list-box">
          <Stack className="tab-name-box">
            <Typography
              className="tab-name"
              //   onClick={() => changeStatusHandler(PropertyStatus.ACTIVE)}
              //   className={
              //     searchFilter.search.propertyStatus === "ACTIVE"
              //       ? "active-tab-name"
              //       : "tab-name"
              //   }
            >
            Activeted
            </Typography>
            <Typography
              className="tab-name"
              //   onClick={() => changeStatusHandler(PropertyStatus.SOLD)}
              //   className={
              //     searchFilter.search.propertyStatus === "SOLD"
              //       ? "active-tab-name"
              //       : "tab-name"
              //   }
            >
              Deactiveted
            </Typography>
          </Stack>
          <Stack className="list-box">
            <Stack className="listing-title-box">
              <Typography className="title-text">Listing title</Typography>
              <Typography className="title-text">Date Published</Typography>
              <Typography className="title-text">Status</Typography>
              <Typography className="title-text">View</Typography>
              <Typography className="title-text">Action</Typography>
            </Stack>

            {/* <div className={"no-data"}>
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Property found!</p>
            </div> */}

            <MyProviderCard />
            <Stack className="pagination-config">
              <Stack className="pagination-box">
                <Pagination
                  page={1}
                  count={10}
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

export default MyPosts;
