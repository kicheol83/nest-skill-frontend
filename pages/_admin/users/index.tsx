import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { MemberPanelList } from "../../../libs/components/admin/users/MemberList";
import { Box, InputAdornment, List, ListItem, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import TablePagination from "@mui/material/TablePagination";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useMutation, useQuery } from "@apollo/client";
import withAdminLayout from "@/libs/components/layout/LayoutAdmin";

const AdminUsers: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);

  const [membersTotal, setMembersTotal] = useState<number>(0);
  const [value, setValue] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("ALL");

  /** APOLLO REQUESTS **/

  /** LIFECYCLES **/

  /** HANDLERS **/

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
    setSearchText("");

    switch (newValue) {
      case "ACTIVE":
        break;
      case "BLOCK":
        break;
      case "DELETE":
        break;
      default:
        break;
    }
  };

  const textHandler = useCallback((value: string) => {
    try {
      setSearchText(value);
    } catch (err: any) {
      console.log("textHandler: ", err.message);
    }
  }, []);

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Member List
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
                  onClick={(e: any) => tabChangeHandler(e, "BLOCK")}
                  value="BLOCK"
                  className={value === "BLOCK" ? "li on" : "li"}
                >
                  Blocked
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "DELETE")}
                  value="DELETE"
                  className={value === "DELETE" ? "li on" : "li"}
                >
                  Deleted
                </ListItem>
              </List>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <OutlinedInput
                  value={searchText}
                  onChange={(e: any) => textHandler(e.target.value)}
                  sx={{ width: "100%" }}
                  className={"search"}
                  placeholder="Search user name"
                  endAdornment={
                    <>
                      {searchText && (
                        <CancelRoundedIcon style={{ cursor: "pointer" }} />
                      )}
                      <InputAdornment position="end">
                        <img
                          src="/img/icons/search_icon.png"
                          alt={"searchIcon"}
                        />
                      </InputAdornment>
                    </>
                  }
                />
                <Select sx={{ width: "160px", ml: "20px" }} value={searchType}>
                  <MenuItem value={"ALL"}>All</MenuItem>
                  <MenuItem value={"USER"}>User</MenuItem>
                  <MenuItem value={"AGENT"}>Agent</MenuItem>
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
              </Stack>
              <Divider />
            </Box>
            <MemberPanelList />

            {/* <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={membersTotal}
              rowsPerPage={1}
              page={10}
            /> */}
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminUsers.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    search: {},
  },
};

export default withAdminLayout(AdminUsers);
