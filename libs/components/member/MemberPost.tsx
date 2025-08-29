import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { T } from "../../types/common";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { GET_PROVIDER_POSTS } from "@/apollo/user/query";
import { MyProviderPostCard } from "../mypage/MyProviderPostCard";

const MyProviderPost: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const { memberId } = router.query;
  const [searchFilter, setSearchFilter] = useState<ProviderJobsInquiry>({
    ...initialInput,
  });
  const [providerPost, setProviderJobs] = useState<ProviderPost[]>([]);
  const [total, setTotal] = useState<number>(0);

  /** APOLLO REQUESTS **/
  const {
    loading: getProviderJobsLoading,
    data: getProviderJobsData,
    error: getProviderJobsError,
    refetch: getProviderJobsRefetch,
  } = useQuery(GET_PROVIDER_POSTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    skip: !searchFilter?.search?.memberId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProviderJobs(data?.getProviderJobs?.list);
      setTotal(data?.getProviderJobs?.metaCounter[0]?.total ?? 0);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getProviderJobsRefetch().then();
  }, [searchFilter]);

  useEffect(() => {
    if (memberId)
      setSearchFilter({
        ...initialInput,
        search: { ...initialInput.search, memberId: memberId as string },
      });
  }, [memberId]);

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
  };

  if (device === "mobile") {
    return <div>NESTAR PROPERTIES MOBILE</div>;
  } else {
    return (
      <div id="member-properties-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Porvider Post</Typography>
          </Stack>
        </Stack>
        <Stack className="properties-list-box">
          <Stack className="list-box">
            {providerPost?.length > 0 && (
              <Stack className="listing-title-box">
                <Typography className="title-text">Listing title</Typography>
                <Typography className="title-text">Date Published</Typography>
                <Typography className="title-text">Status</Typography>
                <Typography className="title-text">View</Typography>
              </Stack>
            )}
            {providerPost?.length === 0 && (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No Post found!</p>
              </div>
            )}
            {providerPost?.map((providerPost: ProviderPost) => {
              return (
                <MyProviderPostCard
                  providerPost={providerPost}
                  memberPage={true}
                  key={providerPost?._id}
                />
              );
            })}

            {providerPost.length !== 0 && (
              <Stack className="pagination-config">
                <Stack className="pagination-box">
                  <Pagination
                    count={Math.ceil(total / searchFilter.limit)}
                    page={searchFilter.page}
                    shape="circular"
                    color="primary"
                    onChange={paginationHandler}
                  />
                </Stack>
                <Stack className="total-result">
                  <Typography>{total} post available</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    );
  }
};

MyProviderPost.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    search: {
      memberId: "",
    },
  },
};

export default MyProviderPost;
