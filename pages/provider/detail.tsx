import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";

import { useRouter } from "next/router";
import ProviderPostCard from "@/libs/components/common/ProviderBigCard";
import { ChangeEvent, useEffect, useState } from "react";
import CommentBox from "@/libs/components/provider/Comment";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { userVar } from "@/apollo/store";
import { Member } from "@/libs/types/member/member";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
import { CommentGroup } from "@/libs/enums/comment.enum";
import {
  CREATE_COMMENT,
  LIKE_TARGET_PROVIDER_POST,
} from "@/apollo/user/mutation";
import {
  GET_COMMENTS,
  GET_MEMBER,
  GET_PROVIDER_POSTS,
} from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import { Messages, REACT_APP_API_URL } from "@/libs/config";
import moment from "moment";
import { Comment } from "@/libs/types/comment/comment";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const AgentDetail: NextPage = ({
  initialInput,
  initialComment,
  ...props
}: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [provider, setProvider] = useState<Member | null>(null);
  const [providerCard, setProviderCard] = useState<ProviderPost[]>([]);
  const [searchFilter, setSearchFilter] =
    useState<ProviderJobsInquiry>(initialInput);
  const [comment, setComment] = useState<Comment[]>([]);
  const [providerPostTotal, setProviderPostTotal] = useState<number>(0);
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [commentInquiry, setCommentInquiry] =
    useState<CommentsInquiry>(initialComment);
  const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
    commentGroup: CommentGroup.MEMBER,
    commentContent: "",
    commentRefId: "",
  });
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const id = router.query.id as string | undefined;
    console.log("id from query:", id);
    if (id) setProviderId(id);
  }, [router.query.id]);

  useEffect(() => {
    console.log("router object:", router);
    console.log("router.query.providerId:", router.query.providerId);
  }, [router]);

  /** APOLLO REQUESTS **/
  const [createComment] = useMutation(CREATE_COMMENT);
  const [likeTargetProviderPost] = useMutation(LIKE_TARGET_PROVIDER_POST);

  const {
    loading: getMemberLoading,
    data: getMemberData,
    error: getMemberError,
    refetch: getMemberRefetch,
  } = useQuery(GET_MEMBER, {
    fetchPolicy: "network-only",
    variables: { input: providerId },
    skip: !providerId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProvider(data?.getMember);
      setSearchFilter({
        ...searchFilter,
        search: {
          memberId: data?.getMember?._id,
        },
      });
      setCommentInquiry({
        ...commentInquiry,
        search: {
          commentRefId: data?.getMember?._id,
        },
      });
      setInsertCommentData({
        ...insertCommentData,
        commentRefId: data?.getMember?._id,
      });
    },
  });

  const {
    loading: getProviderPostsLoading,
    data: getProviderPostsData,
    error: getProviderPostsError,
    refetch: getProviderPostsRefetch,
  } = useQuery(GET_PROVIDER_POSTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    skip: !searchFilter.search.memberId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProviderCard(data?.getProviderJobs?.list);
      setProviderPostTotal(data?.getProviderJobs.metaCounter[0]?.total ?? 0);
    },
  });

  const {
    loading: getCommentsLoading,
    data: getCommentsData,
    error: getCommentsError,
    refetch: getCommentsRefetch,
  } = useQuery(GET_COMMENTS, {
    fetchPolicy: "network-only",
    variables: { input: commentInquiry },
    skip: !commentInquiry.search.commentRefId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setComment(data?.getComments?.list);
      setCommentTotal(data?.getComments.metaCounter[0]?.total ?? 0);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    console.log("router.query.providerId:", router.query.providerId);
    if (router.query.providerId) {
      setProviderId(router.query.providerId as string);
    }
  }, [router.query.providerId]);

  useEffect(() => {
    if (searchFilter.search.memberId) {
      getProviderPostsRefetch({ variables: { input: searchFilter } }).then();
    }
  }, [searchFilter]);

  useEffect(() => {
    if (commentInquiry.search.commentRefId) {
      getCommentsRefetch({ variables: { input: commentInquiry } }).then();
    }
  }, [commentInquiry]);

  const commentPaginationChangeHandler = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    commentInquiry.page = value;
    setCommentInquiry({ ...commentInquiry });
  };

  /** HANDLERS **/
  const createCommentHandler = async () => {
    try {
      if (!user._id) throw new Error(Messages.error2);
      if (user._id === providerId)
        throw new Error("Cannot write a review for yourself");
      await createComment({
        variables: {
          input: insertCommentData,
        },
      });

      setInsertCommentData({ ...insertCommentData, commentContent: "" });

      await getCommentsRefetch({ variables: { input: commentInquiry } });
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const likeProviderPostHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Messages.error2);

      await likeTargetProviderPost({
        variables: {
          input: id,
        },
      });
      await getProviderPostsRefetch({ input: searchFilter });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("ERROR, likeProviderPostHandler:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  if (device === "mobile") {
    return <div>PROVIDER DETAIL PAGE MOBILE</div>;
  } else {
    return (
      <Stack className={"provider-detail-page"}>
        <Stack className={"container"}>
          <Stack className={"provider-info"} mt={"70px"}>
            <Stack className="provider-frame">
              <Box className="provider-info1">
                <img
                  src={
                    provider?.memberImage
                      ? `${REACT_APP_API_URL}/${provider?.memberImage}`
                      : "/img/profile/defaultUser.svg"
                  }
                  alt=""
                />

                <Box className="provider-name">
                  <span>{provider?.memberNick}</span>
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
                  {provider?.memberDesc}
                </Typography>
                <Box className="information-wrapper">
                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/fire.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Founded</span>
                        <span className="title-bot">
                          {provider?.createdAt
                            ? moment(provider.createdAt).format("MMMM D, YYYY")
                            : ""}
                        </span>
                      </div>
                    </Box>
                  </Box>

                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/people.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Employees</span>
                        <span className="title-bot">
                          {provider?.memberJobs}
                        </span>
                      </div>
                    </Box>
                  </Box>

                  <Box className="information-bot">
                    <Box className="info-box">
                      <img src="/img/job/location.svg" alt="" />
                      <div className="text">
                        <span className="title-top">Location</span>
                        <span className="title-bot">
                          {provider?.memberAddress
                            ? provider.memberAddress
                            : "no address"}
                        </span>
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
                {providerPostTotal ? (
                  <>
                    {providerCard.map((providerPost, index) => (
                      <ProviderPostCard
                        key={index}
                        providerPost={providerPost}
                        likeProviderPostHandler={likeProviderPostHandler}
                      />
                    ))}
                  </>
                ) : (
                  <div className={"no-data"}>
                    <img src="/img/icons/icoAlert.svg" alt="" />
                    <p>No provider post found!</p>
                  </div>
                )}
              </div>
            </Stack>
          </Stack>
          <Stack className={"review-box"}>
            <Stack
              className={"main-intro"}
              sx={{
                mb: 3,
                textAlign: "center",
                "& span": {
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#007AFF", // ko'k rang
                  letterSpacing: "1px",
                },
                "& p": {
                  fontSize: "16px",
                  color: "#555555",
                  marginTop: "4px",
                },
              }}
            >
              <span>Reviews</span>
              <p>we are glad to see you again</p>
            </Stack>
            {commentTotal !== 0 && (
              <Stack className={"review-wrap"}>
                <Box component={"div"} className={"title-box"}>
                  <StarIcon />
                  <span>
                    {commentTotal} review{commentTotal > 1 ? "s" : ""}
                  </span>
                </Box>
                {comment?.map((comment: Comment) => {
                  return <CommentBox comment={comment} key={comment?._id} />;
                })}
                <Box component={"div"} className={"pagination-box"}>
                  <Pagination
                    page={commentInquiry.page}
                    count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
                    onChange={commentPaginationChangeHandler}
                    shape="circular"
                    color="standard"
                    sx={{
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#007aff",
                        color: "#fff",
                      },
                      "& .MuiPaginationItem-root.Mui-selected:hover": {
                        backgroundColor: "#0063cc",
                      },
                    }}
                  />
                </Box>
              </Stack>
            )}

            <Stack className={"leave-review-config"}>
              <Typography className={"main-title"}>Leave A Review</Typography>
              <Typography className={"review-title"}>Review</Typography>
              <textarea
                onChange={({ target: { value } }: any) => {
                  setInsertCommentData({
                    ...insertCommentData,
                    commentContent: value,
                  });
                }}
                value={insertCommentData.commentContent}
              ></textarea>
              <Box className={"submit-btn"} component={"div"}>
                <Button
                  className="submit-review"
                  disabled={
                    insertCommentData.commentContent === "" || !user?._id
                  }
                  onClick={createCommentHandler}
                  sx={{
                    backgroundColor: insertCommentData.commentContent
                      ? "#007AFF"
                      : "#A0C4FF", // faollik bo'yicha rang
                    color: "#ffffffff",
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": {
                      backgroundColor: insertCommentData.commentContent
                        ? "#005BB5"
                        : "#A0C4FF",
                    },
                  }}
                >
                  <Typography className="title">Submit Review</Typography>
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
                        fill="#FFFFFF"
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

AgentDetail.defaultProps = {
  initialInput: {
    page: 1,
    limit: 3,
    search: {
      memberId: "",
    },
  },
  initialComment: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    directions: "ASC",
    search: {
      commentRefId: "",
    },
  },
};

export default withLayoutNew(AgentDetail);
