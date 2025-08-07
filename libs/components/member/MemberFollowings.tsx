import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MemberFollowings = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const category: any = router.query?.category ?? "properties";

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/

  if (device === "mobile") {
    return <div>NESTAR FOLLOWS MOBILE</div>;
  } else {
    return (
      <div id="member-follows-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">
              {category === "followers" ? "Followers" : "Followings"}
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
            <p>No Followings yet!</p>
          </div> */}

          <Stack className="follows-card-box">
            <Stack className={"info"}>
              <Stack className="image-box">
                <img src="/img/banner/d.avif" alt="" />
              </Stack>
              <Stack className="information-box">
                <Typography className="name">2</Typography>
              </Stack>
            </Stack>
            <Stack className={"details-box"}>
              <Box className={"info-box"} component={"div"}>
                <p>Followers</p>
                <span>2</span>
              </Box>
              <Box className={"info-box"} component={"div"}>
                <p>Followings</p>
                <span>3</span>
              </Box>
              <Box className={"info-box"} component={"div"}>
                <FavoriteIcon color="primary" />
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
                    background: "#f78181",
                    ":hover": { background: "#f06363" },
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
        </Stack>

        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination page={1} count={10} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>{total} followings</Typography>
          </Stack>
        </Stack>
      </div>
    );
  }
};

MemberFollowings.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    search: {
      followerId: "",
    },
  },
};

export default MemberFollowings;
