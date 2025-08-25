import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, InputAdornment, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TabContext } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import TablePagination from "@mui/material/TablePagination";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
} from "../../../libs/sweetAlert";
import { MemberUpdate } from "../../../libs/types/member/member.update";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_REVIEW_BY_ADMIN,
  UPDATE_REVIEW_BY_ADMIN,
} from "../../../apollo/admin/mutation";
import { GET_ALL_REVIEWS_BY_ADMIN } from "../../../apollo/admin/query";
import { T } from "../../../libs/types/common";
import { ReviewInquiry } from "@/libs/types/review-post/review.input";
import { Review } from "@/libs/types/review-post/review";
import { ReviewPanelList } from "@/libs/components/admin/review/ReviewMenuList";

const AdminReviews: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [reviewsInquiry, setReviewsInquiry] =
    useState<ReviewInquiry>(initialInquiry);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsTotal, setReviewsTotal] = useState<number>(0);
  const [value, setValue] = useState(
    reviewsInquiry?.search?.reviewComments
      ? reviewsInquiry?.search?.reviewComments
      : "ALL"
  );
  const [searchText, setSearchText] = useState("");

  /** APOLLO REQUESTS **/
  const [updateReviewByAdmin] = useMutation(UPDATE_REVIEW_BY_ADMIN);
  const [deleteReviewByAdmin] = useMutation(DELETE_REVIEW_BY_ADMIN);

  const {
    loading: getAllReviewsByAdminLoading,
    data: getAllReviewsByAdminsData,
    error: getAllReviewsByAdminError,
    refetch: getAllReviewsRefetch,
  } = useQuery(GET_ALL_REVIEWS_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: reviewsInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setReviews(data?.getAllReviewByAdmin?.list);
      setReviewsTotal(data?.getAllReviewByAdmin?.metaCounter[0]?.total ?? 0);
    },
  });
  /** LIFECYCLES **/
  useEffect(() => {
    getAllReviewsRefetch({ input: reviewsInquiry }).then();
  }, [reviewsInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    reviewsInquiry.page = newPage + 1;
    setReviewsInquiry({ ...reviewsInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    reviewsInquiry.limit = parseInt(event.target.value, 10);
    reviewsInquiry.page = 1;
    await getAllReviewsRefetch({ input: reviewsInquiry });
    setReviewsInquiry({ ...reviewsInquiry });
  };

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const updateReviewHandler = async (updateData: MemberUpdate) => {
    try {
      await updateReviewByAdmin({
        variables: {
          input: updateData,
        },
      });
      menuIconCloseHandler();
      await getAllReviewsRefetch({ input: reviewsInquiry });
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const removeReviewHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to delete?")) {
        await deleteReviewByAdmin({
          variables: {
            input: id,
          },
        });
      }
      menuIconCloseHandler();
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const textHandler = useCallback((value: string) => {
    try {
      setSearchText(value);
    } catch (err: any) {
      console.log("textHandler: ", err.message);
    }
  }, []);

  const searchTextHandler = () => {
    try {
      setReviewsInquiry({
        ...reviewsInquiry,
        search: {
          ...reviewsInquiry.search,
          text: searchText,
        },
      });
    } catch (err: any) {
      console.log("searchTextHandler: ", err.message);
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Member List
      </Typography>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box component={"div"}>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <OutlinedInput
                  value={searchText}
                  onChange={(e: any) => textHandler(e.target.value)}
                  sx={{ width: "100%" }}
                  className={"search"}
                  placeholder="Search user name"
                  onKeyDown={(event) => {
                    if (event.key == "Enter") searchTextHandler();
                  }}
                  endAdornment={
                    <>
                      {searchText && (
                        <CancelRoundedIcon
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            setSearchText("");
                            setReviewsInquiry({
                              ...reviewsInquiry,
                              search: {
                                ...reviewsInquiry.search,
                                text: "",
                              },
                            });
                            await getAllReviewsRefetch({
                              input: reviewsInquiry,
                            });
                          }}
                        />
                      )}
                      <InputAdornment
                        position="end"
                        onClick={() => searchTextHandler()}
                      >
                        <img
                          src="/img/icons/search_icon.png"
                          alt={"searchIcon"}
                        />
                      </InputAdornment>
                    </>
                  }
                />
              </Stack>
              <Divider />
            </Box>
            <ReviewPanelList
              reviews={reviews}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updateReviewHandler={updateReviewHandler}
              removeReviewHandler={removeReviewHandler}
            />

            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={reviewsTotal}
              rowsPerPage={reviewsInquiry?.limit}
              page={reviewsInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminReviews.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    search: {},
  },
};

export default withAdminLayout(AdminReviews);
