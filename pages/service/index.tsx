import Filter from "@/libs/components/service/Filter";
import ServiceJobsCard from "@/libs/components/service/ServiceJobsCard";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import { useRouter } from "next/router";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { LIKE_TARGET_PROVIDER_POST } from "@/apollo/user/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROVIDER_POSTS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import { Direction, Message } from "@/libs/enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const ServicePage: NextPage = ({ initialInput, ...props }) => {
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useState<ProviderJobsInquiry>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );
  const [filterSortName, setFilterSortName] = useState("New");
  const [serviceJobs, setServiceJobs] = useState<ProviderPost[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortingOpen, setSortingOpen] = useState(false);

  /** APOLLO REQUESTS **/
  const [likeTargetProviderPost] = useMutation(LIKE_TARGET_PROVIDER_POST);

  const {
    loading: getProviderPostsLoading,
    data: getProviderPostsData,
    error: gettProviderPostsError,
    refetch: getProviderPostsRefetch,
  } = useQuery(GET_PROVIDER_POSTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setServiceJobs(data?.getProviderJobs?.list);
      setTotal(data?.getProviderJobs?.metaCounter[0]?.total);
    },
  });
  console.log("searchFilter input:", searchFilter);

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.query.input) {
      const inputObj = JSON.parse(router?.query?.input as string);
      setSearchFilter(inputObj);
    }

    setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
  }, [router]);

  useEffect(() => {
    console.log("searchFilter", searchFilter);
  }, [searchFilter]);

  /** HANDLERS **/
  const handlePaginationChange = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    const newFilter = { ...searchFilter, page: value };
    setSearchFilter(newFilter);

    await router.push(
      `/service?input=${JSON.stringify(newFilter)}`,
      `/service?input=${JSON.stringify(newFilter)}`,
      { scroll: false }
    );

    setCurrentPage(value);
  };

  const likeProviderPostHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProviderPost({
        variables: { input: id },
      });
      await getProviderPostsRefetch({ input: initialInput });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("ERROR, likeProviderPostHandler:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const sortingClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setSortingOpen(true);
  };

  const sortingCloseHandler = () => {
    setSortingOpen(false);
    setAnchorEl(null);
  };

  const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    switch (e.currentTarget.id) {
      case "new":
        setSearchFilter({
          ...searchFilter,
          sort: "createdAt",
          directions: Direction.ASC,
        });
        setFilterSortName("New");
        break;
      case "lowest":
        setSearchFilter({
          ...searchFilter,
          sort: "providerWorkPrice",
          directions: Direction.ASC,
        });
        setFilterSortName("Lowest Price");
        break;
      case "highest":
        setSearchFilter({
          ...searchFilter,
          sort: "providerWorkPrice",
          directions: Direction.DESC,
        });
        setFilterSortName("Highest Price");
    }
    setSortingOpen(false);
    setAnchorEl(null);
  };
  return (
    <Stack className="service-page">
      <Stack className="container" marginTop={"78px"}>
        <Stack className="service-frame">
          <Stack className="service-frame-main">
            <Box className="jobs-title">
              <Box className="right">
                <span className="text-top">All Jobs</span>
                <span className="text-bott">Showing {total} results</span>
              </Box>
              <Box className="left">
                <Box display="flex" alignItems="center">
                  <Typography color="text.secondary" fontSize="14px" mr={1}>
                    Sort by:
                  </Typography>
                  <Button
                    onClick={sortingClickHandler}
                    endIcon={<KeyboardArrowDownRoundedIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#1c1c2b",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#e0e0ff" },
                    }}
                  >
                    {filterSortName}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={sortingOpen}
                    onClose={sortingCloseHandler}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: "12px",
                        minWidth: 160,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={sortingHandler}
                      id={"new"}
                      disableRipple
                      sx={{
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      }}
                    >
                      New
                    </MenuItem>
                    <MenuItem
                      onClick={sortingHandler}
                      id={"lowest"}
                      disableRipple
                      sx={{
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      }}
                    >
                      Lowest Price
                    </MenuItem>
                    <MenuItem
                      onClick={sortingHandler}
                      id={"highest"}
                      disableRipple
                      sx={{
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      }}
                    >
                      Highest Price
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box className="jobs-frame">
            {serviceJobs.length === 0 ? (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No Post found!</p>
              </div>
            ) : (
              serviceJobs.map((providerPost: ProviderPost) => (
                <ServiceJobsCard
                  key={providerPost._id}
                  providerPost={providerPost}
                  likeProviderPostHandler={likeProviderPostHandler}
                />
              ))
            )}
          </Box>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              page={currentPage}
              count={Math.ceil(total / searchFilter.limit)}
              onChange={handlePaginationChange}
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
        <Stack className="filter">
          <Filter
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            initialInput={initialInput}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

ServicePage.defaultProps = {
  initialInput: {
    page: 1,
    limit: 9,
    directions: "DESC",
    search: {
      workTimeRange: {
        start: "06:00",
        end: "18:00",
      },
      workPrice: {
        start: 0,
        end: 500,
      },
    },
  },
};

export default withLayoutNew(ServicePage);
