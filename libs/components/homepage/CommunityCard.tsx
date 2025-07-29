import React from "react";
import Link from "next/link";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Box } from "@mui/material";
import Moment from "react-moment";
import { url } from "inspector";

interface CommunityCardProps {
  vertical: boolean;
  index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
  const { vertical, index } = props;
  const device = useDeviceDetect();
  //   const articleImage = article?.articleImage
  //     ? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
  //     : "/img/event.svg";

  if (device === "mobile") {
    return <div>COMMUNITY CARD (MOBILE)</div>;
  } else {
    if (vertical) {
      return (
        <Link href={""}>
          <Box component={"div"} className={"vertical-card"}>
            <div
              className={"community-img"}
              style={{ backgroundImage: `url("/img/article-img.avif")` }}
            >
              <div>{index + 1}</div>
            </div>
            <strong>Best Article</strong>
            <span>Free Board</span>
          </Box>
        </Link>
      );
    } else {
      return (
        <>
          <Link href={""}>
            <Box component={"div"} className="horizontal-card">
              <img src="/img/article-img.avif" alt="" />
              <div>
                <strong>Now Article</strong>
                <span>
                  <Moment format="DD.MM.YY">2025.07.29</Moment>
                </span>
              </div>
            </Box>
          </Link>
        </>
      );
    }
  }
};

export default CommunityCard;
