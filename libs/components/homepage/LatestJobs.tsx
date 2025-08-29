import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import LatestJobsCard from "./LatestJobsCard";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PROVIDER_POST } from "@/apollo/user/mutation";
import { GET_PROVIDER_POSTS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import { Message } from "@/libs/enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import UserCard from "./LatestCards";

interface LatestProps {
  initialInput: ProviderJobsInquiry;
}

const LatestJobs = (props: LatestProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [latestJobs, setLatestJobs] = useState<ProviderPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );

  /** APOLLO REQUEST **/
  const [likeTargetProviderPost] = useMutation(LIKE_TARGET_PROVIDER_POST);

  const {
    loading: getLatestLoading,
    data: getLatestData,
    error: getLatestError,
    refetch: getLatestRefetch,
  } = useQuery(GET_PROVIDER_POSTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (getLatestData?.getProviderJobs?.list) {
      setLatestJobs(getLatestData.getProviderJobs.list);
      setTotal(getLatestData?.getProviderJobs.metaCounter[0]?.total);
    }
  }, [getLatestData]);

  /** HANDLERS **/
  const likeLatestHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProviderPost({
        variables: { input: id },
      });
      await getLatestRefetch({ input: searchFilter });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("ERROR, likeFeaturedHandler:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const paginationChangeHandler = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    const newFilter = { ...searchFilter, page: value };
    setSearchFilter(newFilter);
    setCurrentPage(value);

    await router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          pageL: value,
          inputL: JSON.stringify(newFilter),
        },
      },
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (router.query.pageL) {
      const pageNumber = Number(router.query.pageL);
      const newFilter = { ...searchFilter, page: pageNumber };
      setSearchFilter(newFilter);
      setCurrentPage(pageNumber);
    }
  }, [router.query.pageL]);

  if (latestJobs) console.log("featured: +++", latestJobs);
  if (!latestJobs) return null;

  if (device === "mobile") {
    return <div>CATEGORY</div>;
  } else {
    return (
      <Stack className="latest">
        <Stack className="container">
          <Box className="latest-title">
            <span>
              Latest<span className="latest-txt">jobs open</span>{" "}
            </span>
            <Box className="show-all">
              <span onClick={() => router.push("/service")}>
                Show all jobs{" "}
              </span>
              <img src="/icons/Stroke.svg" alt="" />
            </Box>
          </Box>
          <Box className="latest-card">
            <Box className="latest-frame">
              {latestJobs.map((latest: ProviderPost) => (
                <UserCard
                  key={latest._id}
                  latest={latest}
                  likeLatestHandler={likeLatestHandler}
                />
              ))}
            </Box>
          </Box>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              count={Math.ceil(total / initialInput.limit)}
              onChange={paginationChangeHandler}
              variant="outlined"
              shape="circular"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                  width: "38px",
                  height: "38px",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

LatestJobs.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default LatestJobs;
