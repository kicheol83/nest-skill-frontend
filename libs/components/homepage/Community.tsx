import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Link, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CommunityCard from "./CommunityCard";

const CommunityBoard = () => {
  const device = useDeviceDetect();
  const [communityFree, setCommunityFree] = useState<number[]>([1, 2, 3]);
  const [communityNew, setCommunityNew] = useState<number[]>([1, 2, 3]);

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
          <Stack className="community-main">
            <Stack className={"community-left"}>
              <Stack className={"content-top"}>
                <Link href={""}>
                  <span>News</span>
                </Link>
                <img src="/icons/category/arrow-left.svg" alt="" />
              </Stack>
              <Stack className={"card-wrap"}>
                {communityNew.map((article, index) => {
                  return <CommunityCard vertical={true} index={index} />;
                })}
              </Stack>
            </Stack>
            <Stack className={"community-right"}>
              <Stack className={"content-top"}>
                <Link href={"/community?articleCategory=FREE"}>
                  <span>Free</span>
                </Link>
                <img src="/icons/category/arrow-left.svg" alt="" />
              </Stack>
              <Stack className={"card-wrap vertical"}>
                {communityFree.map((article, index) => {
                  return <CommunityCard vertical={false} index={index} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default CommunityBoard;
