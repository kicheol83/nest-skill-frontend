import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import CommunityCard from "../common/CommunityCard";

const MemberArticles: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const { memberId } = router.query;

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <div>MEMBER ARTICLES MOBILE</div>;
  } else {
    return (
      <div id="member-articles-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Articles</Typography>
          </Stack>
        </Stack>
        <Stack className="articles-list-box">
          {/* <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Articles found!</p>
          </div> */}

          <CommunityCard />
        </Stack>
        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination count={1} page={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>{total} property available</Typography>
          </Stack>
        </Stack>
      </div>
    );
  }
};

MemberArticles.defaultProps = {
  initialInput: {
    page: 1,
    limit: 6,
    sort: "createdAt",
    direction: "DESC",
    search: {},
  },
};

export default MemberArticles;
