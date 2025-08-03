import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import {
  Button,
  Stack,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Backdrop,
  Pagination,
  Box,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Moment from "react-moment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import EditIcon from "@mui/icons-material/Edit";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const CommunityDetail: NextPage = ({ initialInput, ...props }: T) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const { query } = router;

  const articleId = query?.id as string;
  const articleCategory = query?.articleCategory as string;

  const [comment, setComment] = useState<string>("");
  const [wordsCnt, setWordsCnt] = useState<number>(0);
  const [updatedCommentWordsCnt, setUpdatedCommentWordsCnt] =
    useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [memberImage, setMemberImage] = useState<string>(
    "/img/community/articleImg.png"
  );
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>("");
  const [updatedCommentId, setUpdatedCommentId] = useState<string>("");
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/
  const tabChangeHandler = (event: React.SyntheticEvent, value: string) => {
    router.replace(
      {
        pathname: "/community",
        query: { articleCategory: value },
      },
      "/community",
      { shallow: true }
    );
  };

  const getCommentMemberImage = (imageUrl: string | undefined) => {
    if (imageUrl) return `${process.env.REACT_APP_API_URL}/${imageUrl}`;
    else return "/img/community/articleImg.png";
  };

  const cancelButtonHandler = () => {
    setOpenBackdrop(false);
    setUpdatedComment("");
    setUpdatedCommentWordsCnt(0);
  };

  const updateCommentInputHandler = (value: string) => {
    if (value.length > 100) return;
    setUpdatedCommentWordsCnt(value.length);
    setUpdatedComment(value);
  };

  if (device === "mobile") {
    return <div>COMMUNITY DETAIL PAGE MOBILE</div>;
  } else {
    return (
      <div id="community-detail-page">
        <div className="container">
          <Stack className="main-box">
            <Stack className="left-config">
              <Stack className={"image-info"}>
                <img src={"/icons/nest-logo.svg"} />
                <Stack className={"community-name"}>
                  <Typography className={"name"}>
                    Community Board Article
                  </Typography>
                </Stack>
              </Stack>
              <Tabs
                orientation="vertical"
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                onChange={tabChangeHandler}
                value={articleCategory}
              >
                <Tab
                  value={"FREE"}
                  label={"Free Board"}
                  className={`tab-button ${
                    articleCategory === "FREE" ? "active" : ""
                  }`}
                />
                <Tab
                  value={"RECOMMEND"}
                  label={"Recommendation"}
                  className={`tab-button ${
                    articleCategory === "RECOMMEND" ? "active" : ""
                  }`}
                />
                <Tab
                  value={"NEWS"}
                  label={"News"}
                  className={`tab-button ${
                    articleCategory === "NEWS" ? "active" : ""
                  }`}
                />
                <Tab
                  value={"HUMOR"}
                  label={"Humor"}
                  className={`tab-button ${
                    articleCategory === "HUMOR" ? "active" : ""
                  }`}
                />
              </Tabs>
            </Stack>
            <div className="community-detail-config">
              <Stack className="title-box">
                <Stack className="left">
                  <Typography className="title">
                    {articleCategory} BOARD
                  </Typography>
                  <Typography className="sub-title">
                    Express your opinions freely here without content
                    restrictions
                  </Typography>
                </Stack>
                <Button
                  onClick={() =>
                    router.push({
                      pathname: "/mypage",
                      query: {
                        category: "writeArticle",
                      },
                    })
                  }
                  className="right"
                >
                  Write
                </Button>
              </Stack>
              <div className="config">
                <Stack className="first-box-config">
                  <Stack className="content-and-info">
                    <Stack className="content">
                      <Typography className="content-data">
                        New Article
                      </Typography>
                      <Stack className="member-info">
                        <img
                          src="/img/banner/d.avif"
                          alt=""
                          className="member-img"
                        />
                        <Typography className="member-nick">Ned</Typography>
                        <Stack className="divider"></Stack>
                        <Moment
                          className={"time-added"}
                          format={"DD.MM.YY HH:mm"}
                        >
                          2025.08.02
                        </Moment>
                      </Stack>
                    </Stack>
                    <Stack className="info">
                      <Stack className="icon-info">
                        <Box className="statItem">
                          <FavoriteBorderOutlinedIcon
                            className="icon"
                            fontSize="small"
                          />
                          <Typography>11</Typography>
                        </Box>
                      </Stack>
                      <Stack className="divider"></Stack>
                      <Stack className="icon-info">
                        <Box className="statItem1">
                          <VisibilityOutlinedIcon
                            className="icon"
                            fontSize="small"
                          />
                          <Typography>10</Typography>
                        </Box>
                      </Stack>
                      <Stack className="divider"></Stack>
                      <Stack className="icon-info">
                        <Box className="statItem">
                          <ChatBubbleOutlineOutlinedIcon
                            className="icon"
                            fontSize="small"
                          />
                          <Typography>5</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack>
                    {/* <ToastViewerComponent markdown="" className={"ytb_play"} /> */}
                  </Stack>
                  <Stack className="like-and-dislike">
                    <Stack className="top">
                      <Button>
                        <ThumbUpAltIcon />
                        <ThumbUpOffAltIcon />
                        <Typography className="text">12</Typography>
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  className="second-box-config"
                  sx={{
                    borderBottom: total > 0 ? "none" : "1px solid #eee",
                    border: "1px solid #eee",
                  }}
                >
                  <Typography className="title-text">
                    Comments ({total})
                  </Typography>
                  <Stack className="leave-comment">
                    <input
                      type="text"
                      placeholder="Leave a comment"
                      value={comment}
                      onChange={(e) => {
                        if (e.target.value.length > 100) return;
                        setWordsCnt(e.target.value.length);
                        setComment(e.target.value);
                      }}
                    />
                    <Stack className="button-box">
                      <Typography>{wordsCnt}/100</Typography>
                      <Button>comment</Button>
                    </Stack>
                  </Stack>
                </Stack>
                {total > 0 && (
                  <Stack className="comments">
                    <Typography className="comments-title">Comments</Typography>
                  </Stack>
                )}

                {/* MAP MAP MAP  */}

                <Stack className="comments-box">
                  <Stack className="main-comment">
                    <Stack className="member-info">
                      <Stack className="name-date">
                        <img src="/img/banner/d.avif" alt="" />
                        <Stack className="name-date-column">
                          <Typography className="name">Kevin</Typography>
                          <Typography className="date">
                            <Moment
                              className={"time-added"}
                              format={"DD.MM.YY HH:mm"}
                            >
                              2025.08.02
                            </Moment>
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack className="buttons">
                        <IconButton>
                          <DeleteForeverIcon
                            sx={{ color: "#757575", cursor: "pointer" }}
                          />
                        </IconButton>
                        <IconButton>
                          <EditIcon sx={{ color: "#757575" }} />
                        </IconButton>
                        <Backdrop
                          sx={{
                            top: "40%",
                            right: "25%",
                            left: "25%",
                            width: "1000px",
                            height: "fit-content",
                            borderRadius: "10px",
                            color: "#ffffff",
                            zIndex: 999,
                          }}
                          open={openBackdrop}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              height: "100%",
                              background: "white",
                              border: "1px solid #b9b9b9",
                              padding: "15px",
                              gap: "10px",
                              borderRadius: "10px",
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            }}
                          >
                            <Typography variant="h4" color={"#b9b9b9"}>
                              Update comment
                            </Typography>
                            <Stack gap={"20px"}>
                              <input
                                autoFocus
                                value={updatedComment}
                                onChange={(e) =>
                                  updateCommentInputHandler(e.target.value)
                                }
                                type="text"
                                style={{
                                  border: "1px solid #b9b9b9",
                                  outline: "none",
                                  height: "40px",
                                  padding: "0px 10px",
                                  borderRadius: "5px",
                                }}
                              />
                              <Stack
                                width={"100%"}
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                              >
                                <Typography
                                  variant="subtitle1"
                                  color={"#b9b9b9"}
                                >
                                  {updatedCommentWordsCnt}/100
                                </Typography>
                                <Stack
                                  sx={{
                                    flexDirection: "row",
                                    alignSelf: "flex-end",
                                    gap: "10px",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={() => cancelButtonHandler()}
                                  >
                                    Cancel
                                  </Button>
                                  <Button variant="contained" color="inherit">
                                    Update
                                  </Button>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Backdrop>
                      </Stack>
                    </Stack>
                    <Stack className="content">
                      <Typography>Context</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                {total > 0 && (
                  <Stack className="pagination-box">
                    <Pagination
                      count={1}
                      page={10}
                      shape="circular"
                      color="primary"
                    />
                  </Stack>
                )}
              </div>
            </div>
          </Stack>
        </div>
      </div>
    );
  }
};
// CommunityDetail.defaultProps = {
//   initialInput: {
//     page: 1,
//     limit: 5,
//     sort: "createdAt",
//     direction: "DESC",
//     search: { commentRefId: "" },
//   },
// };

export default withLayoutNew(CommunityDetail);
