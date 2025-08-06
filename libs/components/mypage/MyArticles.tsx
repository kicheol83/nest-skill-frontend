import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";
import CommunityCard from "../common/CommunityCard";

const MyArticles: NextPage = () => {
  const device = useDeviceDetect();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [articles, setArticles] = useState<number[]>([1, 2, 3, 4]);

  /** APOLLO REQUESTS **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <>ARTICLE PAGE MOBILE</>;
  } else
    return (
      <div id="my-articles-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Article</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="article-list-box">
          {articles.map((articles, index) => (
            <CommunityCard />
          ))}

          {/* <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Articles found!</p>
          </div> */}
        </Stack>

        <Stack className="pagination-conf">
          <Stack className="pagination-box">
            <Pagination page={1} count={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total">
            <Typography>
              Total {totalCount ?? 0} article(s) available
            </Typography>
          </Stack>
        </Stack>
      </div>
    );
};

export default MyArticles;
