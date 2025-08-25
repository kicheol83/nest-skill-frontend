import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, List, ListItem, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import TablePagination from "@mui/material/TablePagination";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
} from "../../../libs/sweetAlert";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROVIDER_POSTS_BY_ADMIN } from "../../../apollo/admin/mutation";
import { GET_ALL_PROVIDER_JOBS_BY_ADMIN } from "../../../apollo/admin/query";
import { T } from "../../../libs/types/common";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { AllProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { ProviderLocation, ProviderStatus } from "@/libs/enums/provider.enum";
import { ProviderPostUpdate } from "@/libs/types/provider-post/provider-post.update";
import { ProviderPostPanelList } from "@/libs/components/admin/provider-posts/ProviderList";

const AdminMemberPost: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [providerJobsInquiry, setProviderJobsInquiry] =
    useState<AllProviderJobsInquiry>(initialInquiry);
  const [providerJobs, setProviderJobs] = useState<ProviderPost[]>([]);
  const [providerJobsotal, setProviderJobsTotal] = useState<number>(0);
  const [value, setValue] = useState(
    providerJobsInquiry?.search?.providerStatus
      ? providerJobsInquiry?.search?.providerStatus
      : "ALL"
  );
  const [searchType, setSearchType] = useState("ALL");

  /** APOLLO REQUESTS **/
  const [updatePropertyByAdmin] = useMutation(UPDATE_PROVIDER_POSTS_BY_ADMIN);
  const [removePropertyByAdmin] = useMutation(UPDATE_PROVIDER_POSTS_BY_ADMIN);

  const {
    loading: getAllProviderPostByAdminLoading,
    data: getAllProviderPostByAdminData,
    error: getAllPropertiesByAdminError,
    refetch: getAllProviderPostByAdminRefetch,
  } = useQuery(GET_ALL_PROVIDER_JOBS_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: providerJobsInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProviderJobs(data?.getAllProviderJobsByAdmin?.list);
      setProviderJobsTotal(
        data?.getAllProviderJobsByAdmin.metaCounter[0]?.total
      );
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllProviderPostByAdminRefetch({ input: providerJobsInquiry });
  }, [providerJobsInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    providerJobsInquiry.page = newPage + 1;
    await getAllProviderPostByAdminRefetch({ input: providerJobsInquiry });
    setProviderJobsInquiry({ ...providerJobsInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    providerJobsInquiry.limit = parseInt(event.target.value, 10);
    providerJobsInquiry.page = 1;
    await getAllProviderPostByAdminRefetch({ input: providerJobsInquiry });
    setProviderJobsInquiry({ ...providerJobsInquiry });
  };

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);

    setProviderJobsInquiry({
      ...providerJobsInquiry,
      page: 1,
      sort: "createdAt",
    });

    switch (newValue) {
      case "ACTIVE":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.ACTIVE },
        });
        break;
      case "DEACTIVATED":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.DEACTIVATED },
        });
        break;
      case "DELETE":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.DELETE },
        });
        break;
      case "PENDING":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.PENDING },
        });
        break;
      case "SUSPENDED":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.SUSPENDED },
        });
        break;
      case "BANNED":
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          search: { providerStatus: ProviderStatus.BANNED },
        });
        break;
      default:
        delete providerJobsInquiry?.search?.providerStatus;
        setProviderJobsInquiry({ ...providerJobsInquiry });
        break;
    }
  };

  const removeProviderJobsHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to remove?")) {
      }
      menuIconCloseHandler();
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const searchTypeHandler = async (newValue: string) => {
    try {
      setSearchType(newValue);

      if (newValue !== "ALL") {
        setProviderJobsInquiry({
          ...providerJobsInquiry,
          page: 1,
          sort: "createdAt",
          search: {
            ...providerJobsInquiry.search,
            providerLocationList: [newValue as ProviderLocation],
          },
        });
      } else {
        delete providerJobsInquiry?.search?.providerLocationList;
        setProviderJobsInquiry({ ...providerJobsInquiry });
      }
    } catch (err: any) {
      console.log("searchTypeHandler: ", err.message);
    }
  };

  const updateProviderJobsHandler = async (updateData: ProviderPostUpdate) => {
    try {
      console.log("+updateData: ", updateData);
      await updatePropertyByAdmin({
        variables: {
          input: updateData,
        },
      });
      menuIconCloseHandler();
      await getAllProviderPostByAdminRefetch({ input: providerJobsInquiry });
    } catch (err: any) {
      menuIconCloseHandler();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Jobs List
      </Typography>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box component={"div"}>
              <List className={"tab-menu"}>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "ALL")}
                  value="ALL"
                  className={value === "ALL" ? "li on" : "li"}
                >
                  All
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "ACTIVE")}
                  value="ACTIVE"
                  className={value === "ACTIVE" ? "li on" : "li"}
                >
                  Active
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "DEACTIVATED")}
                  value="DEACTIVATED"
                  className={value === "DEACTIVATED" ? "li on" : "li"}
                >
                  Dactive
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "DELETE")}
                  value="DELETE"
                  className={value === "DELETE" ? "li on" : "li"}
                >
                  Delete
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "PENDING")}
                  value="PENDING"
                  className={value === "PENDING" ? "li on" : "li"}
                >
                  Pending
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "SUSPENDED")}
                  value="SUSPENDED"
                  className={value === "SUSPENDED" ? "li on" : "li"}
                >
                  Suspended
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "BANNED")}
                  value="BANNED"
                  className={value === "BANNED" ? "li on" : "li"}
                >
                  Banned
                </ListItem>
              </List>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <Select sx={{ width: "160px", mr: "20px" }} value={searchType}>
                  <MenuItem
                    value={"ALL"}
                    onClick={() => searchTypeHandler("ALL")}
                  >
                    ALL
                  </MenuItem>
                  {Object.values(ProviderLocation).map((location: string) => (
                    <MenuItem
                      value={location}
                      onClick={() => searchTypeHandler(location)}
                      key={location}
                    >
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Divider />
            </Box>
            <ProviderPostPanelList
              providerJobs={providerJobs}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updateProviderJobsHandler={updateProviderJobsHandler}
              removeProviderJobsHandler={removeProviderJobsHandler}
            />

            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={providerJobsotal}
              rowsPerPage={providerJobsInquiry?.limit}
              page={providerJobsInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminMemberPost.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default withAdminLayout(AdminMemberPost);
