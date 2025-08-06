import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MemberFollowers = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const [followers, setFollowers] = useState<number[]>([1, 2, 3, 4]);

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  if (device === "mobile") {
    return <div>NESTAR FOLLOWS MOBILE</div>;
  } else {
    return (
      <div id="member-follows-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">
              {/* {category === "followers" ? "Followers" : "Followings"} */}
              Followers
            </Typography>
          </Stack>
        </Stack>
        <Stack className="follows-list-box">
          <Stack className="listing-title-box">
            <Typography className="title-text">Name</Typography>
            <Typography className="title-text">Details</Typography>
            <Typography className="title-text">Subscription</Typography>
          </Stack>

          {/* <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Followers yet!</p>
          </div> */}
          {followers.map((followers, index) => (
            <Stack className="follows-card-box">
              <Stack className={"info"}>
                <Stack className="image-box">
                  <img src="/img/banner/d.avif" alt="" />
                </Stack>
                <Stack className="information-box">
                  <Typography className="name">Ned</Typography>
                </Stack>
              </Stack>
              <Stack className={"details-box"}>
                <Box className={"info-box"} component={"div"}>
                  <p>Followers</p>
                  <span>1</span>
                </Box>
                <Box className={"info-box"} component={"div"}>
                  <p>Followings</p>
                  <span>2</span>
                </Box>
                <Box className={"info-box"} component={"div"}>
                  {/* <FavoriteIcon color="primary" /> */}
                  <FavoriteBorderIcon />
                  <span>1</span>
                </Box>
              </Stack>

              <Stack className="action-box">
                <>
                  <Typography>Following</Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      background: "#ed5858",
                      ":hover": { background: "#ee7171" },
                    }}
                  >
                    Unfollow
                  </Button>
                </>
                <Button
                  variant="contained"
                  sx={{
                    background: "#60eb60d4",
                    ":hover": { background: "#60eb60d4" },
                  }}
                >
                  Follow
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination page={1} count={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>{total} followers</Typography>
          </Stack>
        </Stack>
      </div>
    );
  }
};

export default MemberFollowers;
