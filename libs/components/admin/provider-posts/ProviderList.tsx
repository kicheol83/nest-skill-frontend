import React from "react";
import Link from "next/link";
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import { REACT_APP_API_URL } from "../../../config";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { ProviderStatus } from "@/libs/enums/provider.enum";

interface Data {
  id: string;
  title: string;
  price: string;
  agent: string;
  location: string;
  type: string;
  status: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "MB ID",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "TITLE",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "PRICE",
  },
  {
    id: "agent",
    numeric: false,
    disablePadding: false,
    label: "AGENT",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "LOCATION",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "TYPE",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ProviderPanelListType {
  providerJobs: ProviderPost[];
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateProviderJobsHandler: any;
  removeProviderJobsHandler: any;
}

export const ProviderPostPanelList = (props: ProviderPanelListType) => {
  const {
    providerJobs,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    updateProviderJobsHandler,
    removeProviderJobsHandler,
  } = props;

  return (
    <Stack>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {providerJobs.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className={"no-data"}>data not found!</span>
                </TableCell>
              </TableRow>
            )}

            {providerJobs.length !== 0 &&
              providerJobs.map((providerPost: ProviderPost, index: number) => {
                const providerImages = `${REACT_APP_API_URL}/${providerPost?.providerImages[0]}`;

                return (
                  <TableRow
                    hover
                    key={providerPost?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{providerPost._id}</TableCell>
                    <TableCell align="left" className={"name"}>
                      {providerPost.providerStatus === ProviderStatus.ACTIVE ? (
                        <Stack direction={"row"}>
                          <Link
                            href={`/service/detail?id=${providerPost?._id}`}
                          >
                            <div>
                              <Avatar
                                alt="Remy Sharp"
                                src={providerImages}
                                sx={{ ml: "2px", mr: "10px" }}
                              />
                            </div>
                          </Link>
                          <Link
                            href={`/service/detail?id=${providerPost?._id}`}
                          >
                            <div>{providerPost.providerTitle}</div>
                          </Link>
                        </Stack>
                      ) : (
                        <Stack direction={"row"}>
                          <div>
                            <Avatar
                              alt="Remy Sharp"
                              src={providerImages}
                              sx={{ ml: "2px", mr: "10px" }}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            {providerPost.providerTitle}
                          </div>
                        </Stack>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {providerPost.providerWorkPrice}
                    </TableCell>
                    <TableCell align="center">
                      {providerPost.memberData?.memberNick}
                    </TableCell>
                    <TableCell align="center">
                      {providerPost.providerLocation}
                    </TableCell>
                    <TableCell align="center">
                      {providerPost.providerType}
                    </TableCell>
                    <TableCell align="center">
                      {providerPost.providerStatus ===
                        ProviderStatus.DELETE && (
                        <Button
                          variant="outlined"
                          sx={{
                            p: "3px",
                            border: "none",
                            ":hover": { border: "1px solid #000000" },
                          }}
                          onClick={() =>
                            removeProviderJobsHandler(providerPost._id)
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      )}

                      {providerPost.providerStatus ===
                        ProviderStatus.DEACTIVATED && (
                        <Button className={"badge warning"}>
                          {providerPost.providerStatus}
                        </Button>
                      )}

                      {providerPost.providerStatus ===
                        ProviderStatus.ACTIVE && (
                        <>
                          <Button
                            onClick={(e: any) => menuIconClickHandler(e, index)}
                            className={"badge success"}
                          >
                            {providerPost.providerStatus}
                          </Button>

                          <Menu
                            className={"menu-modal"}
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            anchorEl={anchorEl[index]}
                            open={Boolean(anchorEl[index])}
                            onClose={menuIconCloseHandler}
                            TransitionComponent={Fade}
                            sx={{ p: 1 }}
                          >
                            {Object.values(ProviderStatus)
                              .filter((ele) => ele !== providerPost.providerStatus)
                              .map((status: string) => (
                                <MenuItem
                                  onClick={() =>
                                    updateProviderJobsHandler({
                                      _id: providerPost._id,
                                      providerStatus: status,
                                    })
                                  }
                                  key={status}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"span"}
                                  >
                                    {status}
                                  </Typography>
                                </MenuItem>
                              ))}
                          </Menu>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
