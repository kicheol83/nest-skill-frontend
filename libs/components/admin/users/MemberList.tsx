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
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

interface Data {
  id: string;
  nickname: string;
  fullname: string;
  phone: string;
  type: string;
  state: string;
  warning: string;
  block: string;
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
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "MB ID",
  },
  {
    id: "nickname",
    numeric: true,
    disablePadding: false,
    label: "NICK NAME",
  },
  {
    id: "fullname",
    numeric: false,
    disablePadding: false,
    label: "FULL NAME",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "PHONE NUM",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "MEMBER TYPE",
  },
  {
    id: "warning",
    numeric: false,
    disablePadding: false,
    label: "WARNING",
  },
  {
    id: "block",
    numeric: false,
    disablePadding: false,
    label: "BLOCK CRIMES",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "STATE",
  },
];

// interface EnhancedTableProps {
// 	numSelected: number;
// 	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
// 	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
// 	order: Order;
// 	orderBy: string;
// 	rowCount: number;
// }

function EnhancedTableHead() {
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

// interface MemberPanelListType {
//   members: Member[];
//   anchorEl: any;
//   menuIconClickHandler: any;
//   menuIconCloseHandler: any;
//   updateMemberHandler: any;
// }

export const MemberPanelList = () => {
  //   const {
  //     members,
  //     anchorEl,
  //     menuIconClickHandler,
  //     menuIconCloseHandler,
  //     updateMemberHandler,
  //   } = props;

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
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <span className={"no-data"}>data not found!</span>
              </TableCell>
            </TableRow>

            <TableRow
              hover
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">12345</TableCell>

              <TableCell align="left" className={"name"}>
                <Stack direction={"row"}>
                  <Link href={`/member?memberId=`}>
                    <div>
                      <Avatar
                        alt="Remy Sharp"
                        src="/img/banner/d.avif"
                        sx={{ ml: "2px", mr: "10px" }}
                      />
                    </div>
                  </Link>
                  <Link href={`/member?memberId=`}>
                    <div>Ned</div>
                  </Link>
                </Stack>
              </TableCell>

              <TableCell align="center">Ned Usmonov</TableCell>
              <TableCell align="left">01082333848</TableCell>

              <TableCell align="center">
                <Button className={"badge success"}>COOK</Button>

                <Menu
                  open
                  className={"menu-modal"}
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  TransitionComponent={Fade}
                  sx={{ p: 1 }}
                >
                  <MenuItem>
                    <Typography variant={"subtitle1"} component={"span"}>
                      PHOTO
                    </Typography>
                  </MenuItem>
                </Menu>
              </TableCell>

              <TableCell align="center">1</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">
                <Button className={"badge success"}>ACTIVE</Button>

                <Menu
                  open
                  className={"menu-modal"}
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  sx={{ p: 1 }}
                >
                  <MenuItem>
                    <Typography variant={"subtitle1"} component={"span"}>
                      ACTIVE
                    </Typography>
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
