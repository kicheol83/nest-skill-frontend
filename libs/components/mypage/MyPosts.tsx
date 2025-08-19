import React, { useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { T } from "../../types/common";
import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";
import {
  sweetConfirmAlert,
  sweetErrorAlert,
  sweetErrorHandling,
} from "../../sweetAlert";
import { ProviderMemberInquiry } from "@/libs/types/provider-post/provider-post.input";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { UPDATE_PROVIDER_POST } from "@/apollo/user/mutation";
import { GET_PROVIDER_MEMBER_POSTS } from "@/apollo/user/query";
import { ProviderStatus } from "@/libs/enums/provider.enum";
import { MyProviderPostCard } from "./MyProviderPostCard";

const MyProperties: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const [searchFilter, setSearchFilter] =
    useState<ProviderMemberInquiry>(initialInput);
  const [providerPost, setProviderPost] = useState<ProviderPost[]>([]);
  const [total, setTotal] = useState<number>(0);
  const user = useReactiveVar(userVar);
  const router = useRouter();

  /** APOLLO REQUESTS **/
  const [updateProperty] = useMutation(UPDATE_PROVIDER_POST);

  const {
    loading: getProviderMemberPostsLoading,
    data: getProviderMemberPostsData,
    error: getProviderMemberPostsError,
    refetch: getProviderMemberPostsRefetch,
  } = useQuery(GET_PROVIDER_MEMBER_POSTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProviderPost(data?.getProviderMemberJobs?.list);
      setTotal(data?.getProviderMemberJobs?.metaCounter[0]?.total ?? 0);
    },
  });

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
  };

  const changeStatusHandler = (value: ProviderStatus) => {
    setSearchFilter({ ...searchFilter, search: { providerStatus: value } });
  };

  const deleteProviderPostHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("are you sure to delete this post")) {
        await updateProperty({
          variables: {
            input: {
              _id: id,
              providerStatus: "DELETE",
            },
          },
        });

        await getProviderMemberPostsRefetch({ input: searchFilter });
      }
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  };

  const updateProviderPostHandler = async (status: string, id: string) => {
    try {
      if (await sweetConfirmAlert(`are you sure change to ${status} status`)) {
        await updateProperty({
          variables: {
            input: {
              _id: id,
              providerStatus: status,
            },
          },
        });
        await getProviderMemberPostsRefetch({ input: searchFilter });
      }
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  };

  if (user?.memberType !== "PROVIDER") {
    router.back();
  }

  if (device === "mobile") {
    return <div>NESTAR PROPERTIES MOBILE</div>;
  } else {
    return (
      <div id="my-property-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">My Properties</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="property-list-box">
          <Stack className="tab-name-box">
            <Typography
              onClick={() => changeStatusHandler(ProviderStatus.ACTIVE)}
              className={
                searchFilter.search.providerStatus === "ACTIVE"
                  ? "active-tab-name"
                  : "tab-name"
              }
            >
              ACTIVATED
            </Typography>
            <Typography
              onClick={() => changeStatusHandler(ProviderStatus.DEACTIVATED)}
              className={
                searchFilter.search.providerStatus === "DEACTIVATED"
                  ? "active-tab-name"
                  : "tab-name"
              }
            >
              DEACTIVATED
            </Typography>
          </Stack>
          <Stack className="list-box">
            <Stack className="listing-title-box">
              <Typography className="title-text">Listing title</Typography>
              <Typography className="title-text">Date Published</Typography>
              <Typography className="title-text">Status</Typography>
              <Typography className="title-text">View</Typography>
              {searchFilter.search.providerStatus === "ACTIVE" && (
                <Typography className="title-text">Action</Typography>
              )}
            </Stack>

            {providerPost?.length === 0 ? (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No Property found!</p>
              </div>
            ) : (
              providerPost.map((providerPost: ProviderPost) => {
                return (
                  <MyProviderPostCard
                    providerPost={providerPost}
                    deleteProviderPostHandler={deleteProviderPostHandler}
                    updateProviderPostHandler={updateProviderPostHandler}
                  />
                );
              })
            )}

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
                  <Typography>{total} property available</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    );
  }
};

MyProperties.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    search: {
      providerStatus: "ACTIVE",
    },
  },
};

export default MyProperties;
