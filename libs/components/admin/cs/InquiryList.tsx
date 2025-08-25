import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Notice } from "@/libs/types/notice/notice";
import { REACT_APP_API_URL } from "@/libs/config";
import Moment from "react-moment";
import { NoticeStatus } from "@/libs/enums/notice.enum";

interface Data {
  category: string;
  title: string;
  writer: string;
  date: string;
  status: string;
  id?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "CATEGORY",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "TITLE",
  },

  {
    id: "writer",
    numeric: true,
    disablePadding: false,
    label: "WRITER",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "DATE",
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

interface FaqArticlesPanelListType {
  notices: Notice[];
  anchorEl?: any;
  menuIconClickHandler?: any;
  menuIconCloseHandler?: any;
  updateFaqHandler?: any;
  removeFaqHandler: any;
}

export const InquiryList = (props: FaqArticlesPanelListType) => {
  const {
    notices,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    updateFaqHandler,
    removeFaqHandler,
  } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {notices.map((notice: Notice, index: number) => {
              const imagePath: string = notice?.memberData?.memberImage
                ? `${REACT_APP_API_URL}/${notice?.memberData?.memberImage}`
                : "/img/profile/defaultUser.svg";

              let status_class_name = "";

              return (
                <TableRow
                  hover
                  key={"member._id"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{notice.noticeCategory}</TableCell>
                  <TableCell align="left">{notice.noticeTitle}</TableCell>
                  <TableCell align="left" className={"name"}>
                    <Stack direction={"row"}>
                      <Link href={`/_admin/users/detail?mb_id=$'{member._id'}`}>
                        <div>
                          <Avatar
                            alt="Remy Sharp"
                            src={imagePath}
                            sx={{ ml: "2px", mr: "10px" }}
                          />
                        </div>
                      </Link>
                      <Link href={`/_admin/users/detail?mb_id=${"member._id"}`}>
                        <div>{notice?.memberData?.memberNick}</div>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Moment format={"DD.MM.YY HH:mm"}>
                      {notice?.createdAt}
                    </Moment>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={(e: any) => menuIconClickHandler(e, index)}
                      className={"badge success"}
                    >
                      {notice.noticeStatus}
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
                      {Object.values(NoticeStatus)
                        .filter((ele) => ele !== notice.noticeStatus)
                        .map((status: string) => (
                          <MenuItem
                            onClick={() =>
                              updateFaqHandler({
                                _id: notice._id,
                                noticeStatus: status,
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
