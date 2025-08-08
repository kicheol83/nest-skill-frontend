import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Box, List, ListItem, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import TablePagination from "@mui/material/TablePagination";
import { PropertyPanelList } from "../../../libs/components/admin/properties/PropertyList";
import withAdminLayout from "@/libs/components/layout/LayoutAdmin";

const AdminProperties: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);

  const [propertiesTotal, setPropertiesTotal] = useState<number>(0);
  const [value, setValue] = useState("ALL");
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

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Property List
      </Typography>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box component={"div"}>
              <List className={"tab-menu"}>
                <ListItem
                  value="ALL"
                  className={value === "ALL" ? "li on" : "li"}
                >
                  All
                </ListItem>
                <ListItem
                  value="ACTIVE"
                  className={value === "ACTIVE" ? "li on" : "li"}
                >
                  Active
                </ListItem>
                <ListItem
                  value="SOLD"
                  className={value === "SOLD" ? "li on" : "li"}
                >
                  Sold
                </ListItem>
                <ListItem
                  value="DELETE"
                  className={value === "DELETE" ? "li on" : "li"}
                >
                  Delete
                </ListItem>
              </List>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <Select sx={{ width: "160px", mr: "20px" }} value={searchType}>
                  <MenuItem value={"ALL"}>ALL</MenuItem>

                  <MenuItem value="seoul">SEOUL</MenuItem>
                </Select>
              </Stack>
              <Divider />
            </Box>
            <PropertyPanelList />

            {/* <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={propertiesTotal}
              page={1}
            /> */}
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminProperties.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    direction: "DESC",
    search: {},
  },
};

export default withAdminLayout(AdminProperties);
