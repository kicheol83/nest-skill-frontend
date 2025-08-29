import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import ProviderCard from "@/libs/components/provider/ProviderCard";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member } from "@/libs/types/member/member";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_MEMBER } from "@/apollo/user/mutation";
import { T } from "@/libs/types/common";
import { GET_PROVIDER } from "@/apollo/user/query";
import { Messages } from "@/libs/config";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const Provider: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [provider, setProvider] = useState<Member[]>([]);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [filterSortName, setFilterSortName] = useState("Recent");
  const [sortingOpen, setSortingOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFilter, setSearchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  /** APOLLO REQUESTS **/
  const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

  const {
    loading: getProvidersLoading,
    data: getProvidersData,
    error: getProvidersError,
    refetch: getProvidersRefetch,
  } = useQuery(GET_PROVIDER, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProvider(data?.getProviderMember?.list);
      setTotal(data?.getProviderMember.metaCounter[0]?.total);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.query.input) {
      const input_obj = JSON.parse(router?.query?.input as string);
      setSearchFilter(input_obj);
    } else
      router.replace(
        `/provider?input=${JSON.stringify(searchFilter)}`,
        `/provider?input=${JSON.stringify(searchFilter)}`
      );

    setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
  }, [router]);

  /** HANDLERS **/
  const sortingClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setSortingOpen(true);
  };

  const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    switch (e.currentTarget.id) {
      case "recent":
        setSearchFilter({
          ...searchFilter,
          sort: "createdAt",
          directions: "DESC",
        });
        setFilterSortName("Recent");
        break;
      case "old":
        setSearchFilter({
          ...searchFilter,
          sort: "createdAt",
          directions: "ASC",
        });
        setFilterSortName("Oldest order");
        break;
      case "likes":
        setSearchFilter({
          ...searchFilter,
          sort: "memberLikes",
          directions: "DESC",
        });
        setFilterSortName("Likes");
        break;
      case "views":
        setSearchFilter({
          ...searchFilter,
          sort: "memberViews",
          directions: "DESC",
        });
        setFilterSortName("Views");
        break;
    }
    setSortingOpen(false);
    setAnchorEl2(null);
  };

  const paginationChangeHandler = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    searchFilter.page = value;
    setSearchFilter(value);

    await router.push(
      `/provider?input=${JSON.stringify(searchFilter)}`,
      `/provider?input=${JSON.stringify(searchFilter)}`,
      {
        scroll: false,
      }
    );
    setCurrentPage(value);
  };

  const likeMemberHandler = async (user: any, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Messages.error2);

      await likeTargetMember({
        variables: {
          input: id,
        },
      });

      await getProvidersRefetch({ input: searchFilter });
      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("ERROR, likeProviderHandler:", err.messsage);
      sweetMixinErrorAlert(err.messsage).then();
    }
  };

  if (device === "mobile") {
    return <Stack className={"home-page"}></Stack>;
  } else {
    return (
      <Stack className={"provider-page"}>
        <Stack className="container">
          <Stack className="header-frame">
            <Box className="header-title">
              <div className="big-text">
                Find your<div className="blue-text">providers</div>
              </div>
              <img
                src="/img/profile/blue-bottom-line2.svg"
                alt=""
                style={{
                  marginLeft: "218px",
                  width: "262px",
                  marginTop: "-8px",
                }}
              />
              <span className="small-text">
                Our next project deserves the best — find skilled providers from
                companies you trust
              </span>
            </Box>
            <Stack className="job-search-bar">
              <Box className="search-fields">
                <TextField
                  onChange={(e: any) => {
                    const value = e.target.value;
                    setSearchText(value);
                    setSearchFilter((filter: any) => ({
                      ...filter,
                      page: 1,
                      search: { ...filter.search, text: value },
                    }));
                  }}
                  onKeyDown={(event: any) => {
                    if (event.key == "Enter") {
                      setSearchFilter({
                        ...searchFilter,
                        search: { ...searchFilter.search, text: searchText },
                      });
                    }
                  }}
                  sx={{
                    height: "56px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#007aff",
                      },
                    },
                  }}
                  placeholder="Job title or keyword"
                  variant="outlined"
                  className="search-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Stack>
          </Stack>
          <Box className="right-left">
            <Box className="right">
              <span className="text-top">All Providers</span>
              <span className="text-bott">Showing {total} results</span>
            </Box>
            <Box className="left">
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  color="text.secondary"
                  fontSize="16px"
                  fontWeight={700}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Sort by:
                </Typography>

                <Select
                  onClick={sortingClickHandler}
                  variant="outlined"
                  disableUnderline
                  defaultValue={filterSortName || "recent"}
                  sx={{
                    minWidth: 120,
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fc",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1c1c2b",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    "& .MuiSelect-icon": {
                      color: "#3d5afe",
                      right: "8px",
                    },
                    "&:hover": {
                      backgroundColor: "#eef2ff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#007aff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  <MenuItem value="recent" onClick={sortingHandler} id="recent">
                    Recent
                  </MenuItem>
                  <MenuItem value="old" onClick={sortingHandler} id="old">
                    Oldest
                  </MenuItem>
                  <MenuItem value="likes" onClick={sortingHandler} id="likes">
                    Likes
                  </MenuItem>
                  <MenuItem value="views" onClick={sortingHandler} id="views">
                    Views
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box className="card-frame">
            {provider?.length === 0 ? (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No Provider found!</p>
              </div>
            ) : (
              provider.map((provider: Member) => {
                return (
                  <ProviderCard
                    provider={provider}
                    key={provider._id}
                    likeMemberHandler={likeMemberHandler}
                  />
                );
              })
            )}
          </Box>
          {provider.length !== 0 && Math.ceil(total / searchFilter.limit) > 1 && (
            <Stack className="pagination-box" order={2}>
              <Pagination
                page={currentPage}
                count={Math.ceil(total / searchFilter.limit)}
                onChange={paginationChangeHandler}
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
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  }
};

Provider.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default withLayoutNew(Provider);
