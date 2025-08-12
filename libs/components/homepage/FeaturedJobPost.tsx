import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import FeaturedCard from "./FeaturedCard";
import { useRouter } from "next/router";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PROVIDER_POST } from "@/apollo/user/mutation";
import { GET_PROVIDER_POSTS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import { Message } from "@/libs/enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

interface FeaturedProps {
  initialInput: ProviderJobsInquiry;
}

const Featured = (props: FeaturedProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [featured, setFeatured] = useState<ProviderPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );

  /** APOLLO REQUEST **/
  const [likeTargetProperty] = useMutation(LIKE_TARGET_PROVIDER_POST);

  const {
    loading: getFeaturedLoading,
    data: getFeaturedData,
    error: getFeaturedError,
    refetch: getFeaturedRefetch,
  } = useQuery(GET_PROVIDER_POSTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (getFeaturedData?.getProviderJobs?.list) {
      setFeatured(getFeaturedData.getProviderJobs.list);
      setTotal(getFeaturedData?.getProviderJobs.metaCounter[0]?.total);
    }
  }, [getFeaturedData]);

  /** HANDLERS **/
  const likeFeaturedHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProperty({
        variables: { input: id },
      });
      await getFeaturedRefetch({ input: searchFilter });

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
    const newFilter = { ...initialInput, page: value }; // page ni yangilaymiz
    setSearchFilter(newFilter); // state ga o'rnatamiz
    setCurrentPage(value); // sahifa raqamini ham alohida saqlaymiz (agar kerak bo'lsa)
    await router.push(
      `/?input=${JSON.stringify(newFilter)}`,
      `/?input=${JSON.stringify(newFilter)}`,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (router.query.input) {
      const input_obj = JSON.parse(router.query.input as string);
      setSearchFilter(input_obj);
      setCurrentPage(input_obj.page ?? 1);
    }
  }, [router.query.input]);

  if (featured) console.log("featured: +++", featured);
  if (!featured) return null;

  if (device === "mobile") {
    return <div>FEATURED</div>;
  } else {
    return (
      <Stack className="featured-job-post">
        <Stack className="container">
          <Box className="featured-title">
            <span>
              Featured<span className="featured-txt">job post</span>{" "}
            </span>
            <Box className="show-all">
              <span onClick={() => router.push("/service")}>
                Show all jobs{" "}
              </span>
              <img src="/icons/Stroke.svg" alt="" />
            </Box>
          </Box>
          <Box className="featured-card">
            {featured.length === 0 ? (
              <Box component={"div"} className={"empty-list"}>
                No Posts found!
              </Box>
            ) : (
              <Box className="featured-frame">
                {featured.map((featured: ProviderPost) => (
                  <FeaturedCard
                    key={featured._id}
                    featured={featured}
                    likeFeaturedHandler={likeFeaturedHandler}
                  />
                ))}
              </Box>
            )}
          </Box>
          {featured.length !== 0 && Math.ceil(total / initialInput.limit) > 1 && (
            <Stack className="pagination" spacing={2}>
              <Pagination
                className="pagi-count"
                page={currentPage}
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
          )}
        </Stack>
      </Stack>
    );
  }
};

Featured.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "providerViews",
    directions: "DESC",
    search: {},
  },
};

export default Featured;
