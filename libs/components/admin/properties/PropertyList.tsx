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
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

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

// interface PropertyPanelListType {
// 	properties: Property[];
// 	anchorEl: any;
// 	menuIconClickHandler: any;
// 	menuIconCloseHandler: any;
// 	updatePropertyHandler: any;
// 	removePropertyHandler: any;
// }

export const PropertyPanelList = () => {
  // const {
  // 	properties,
  // 	anchorEl,
  // 	menuIconClickHandler,
  // 	menuIconCloseHandler,
  // 	updatePropertyHandler,
  // 	removePropertyHandler,
  // } = props;

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
              <TableCell align="left">123</TableCell>
              <TableCell align="left" className={"name"}>
                <Stack direction={"row"}>
                  <Link href={`/property/detail?id=`}>
                    <div>
                      <Avatar
                        alt="Remy Sharp"
                        src="/img/banner/d.avif"
                        sx={{ ml: "2px", mr: "10px" }}
                      />
                    </div>
                  </Link>
                  <Link href={`/property/detail?id=`}>
                    <div>Thes Best Photograph</div>
                  </Link>
                </Stack>
                <Stack direction={"row"}>
                  <div>
                    <Avatar
                      alt="Remy Sharp"
                      src="/img/banner/d.avif"
                      sx={{ ml: "2px", mr: "10px" }}
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>Thes best</div>
                </Stack>
              </TableCell>
              <TableCell align="center">200</TableCell>
              <TableCell align="center">Ned</TableCell>
              <TableCell align="center">Seoul</TableCell>
              <TableCell align="center">PHOTOGRAPH</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  sx={{
                    p: "3px",
                    border: "none",
                    ":hover": { border: "1px solid #000000" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>

                <Button className={"badge warning"}>ACTIVE</Button>

                <>
                  <Button>DEACTIVITED</Button>

                  <Menu
                    open={false}
                    className={"menu-modal"}
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    TransitionComponent={Fade}
                    sx={{ p: 1 }}
                  >
                    <MenuItem key={status}>
                      <Typography variant={"subtitle1"} component={"span"}>
                        {status}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
