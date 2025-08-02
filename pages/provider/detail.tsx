import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";

import { useRouter } from "next/router";
import withLayoutProviderDetail from "@/libs/components/layout/LayoutProviderDetail";
import ProviderPostCard from "@/libs/components/common/ProviderBigCard";
import { useState } from "react";
import CommentBox from "@/libs/components/provider/Comment";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const AgentDetail: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();

  const [providerCard, setProviderCard] = useState<number[]>([1, 2, 3]);
  const [comment, setComment] = useState<number[]>([1, 2]);
  const [isOnline, setIsOnline] = useState(true);

  /** HANDLERS **/

  if (device === "mobile") {
    return <div>AGENT DETAIL PAGE MOBILE</div>;
  } else {
    return (
      <Stack className={"provider-detail-page"}>
        <Stack className={"container"}>
          <Stack className={"provider-info"}>
            <Stack className="provider-frame">
              <Box className="provider-info1">
                <img src="/img/banner/d.avif" alt="" />

                <Box className="provider-name">
                  <span>David Johns</span>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    marginLeft={2}
                  >
                    <FiberManualRecordIcon
                      fontSize="small"
                      sx={{ color: isOnline ? "green" : "gray" }}
                    />
                    <Typography variant="body2">
                      {isOnline ? "Online" : "Offline"}
                    </Typography>
                  </Stack>
                </Box>
                <Typography className="title-header">
                  Harkat maglubiyat va yana harakat va galaba
                </Typography>
                <Box className="information-wrapper">
                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/fire.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Founded</span>
                        <span className="title-bot">Avgust 1, 2025</span>
                      </div>
                    </Box>
                  </Box>

                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/people.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Employees</span>
                        <span className="title-bot">4000</span>
                      </div>
                    </Box>
                  </Box>

                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/location.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Location</span>
                        <span className="title-bot">SEOUL</span>
                      </div>
                    </Box>
                  </Box>

                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/industry.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Industry</span>
                        <span className="title-bot">Payment, Gatway</span>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Stack className={"provider-home-list"}>
            <Stack className={"card-wrap"}>
              <div className={"wrap-main"}>
                {providerCard.map((providerCard, index) => (
                  <ProviderPostCard key={index} />
                ))}
              </div>
            </Stack>
            <Stack className={"pagination"}>
              <Stack className="pagination-box" order={2}>
                <Pagination
                  page={1}
                  count={10}
                  shape="circular"
                  color="primary"
                />
              </Stack>
              <span style={{ order: 2 }}>Total 1 provider post available</span>
              <div className={"no-data"} style={{ order: -1 }}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No provider post found!</p>
              </div>
            </Stack>
          </Stack>
          <Stack className={"review-box"}>
            <Stack className={"main-intro"}>
              <span>Reviews</span>
              <p>we are glad to see you again</p>
            </Stack>
            <Stack className={"review-wrap"}>
              <Box component={"div"} className={"title-box"}>
                <StarIcon />
                <span>1 review</span>
              </Box>
              {comment.map((comment, index) => (
                <CommentBox key={index} />
              ))}
              <Box component={"div"} className={"pagination-box"}>
                <Pagination
                  page={1}
                  count={10}
                  shape="circular"
                  color="primary"
                />
              </Box>
            </Stack>

            <Stack className={"leave-review-config"}>
              <Typography className={"main-title"}>Leave A Review</Typography>
              <Typography className={"review-title"}>Review</Typography>
              <textarea value={"Hello"}></textarea>
              <Box className={"submit-btn"} component={"div"}>
                <Button className={"submit-review"}>
                  <Typography className={"title"}>Submit Review</Typography>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_6975_3642)">
                      <path
                        d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
                        fill="#181A20"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6975_3642">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.601562 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default withLayoutProviderDetail(AgentDetail);
