import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Fade,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import OpenInBrowserRoundedIcon from "@mui/icons-material/OpenInBrowserRounded";
import Moment from "react-moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

interface Data {
  category: string;
  title: string;
  writer: string;
  register: string;
  view: number;
  like: number;
  status: string;
  article_id: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "article_id",
    numeric: true,
    disablePadding: false,
    label: "ARTICLE ID",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "TITLE",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "CATEGORY",
  },
  {
    id: "writer",
    numeric: true,
    disablePadding: false,
    label: "WRITER",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "VIEW",
  },
  {
    id: "like",
    numeric: false,
    disablePadding: false,
    label: "LIKE",
  },
  {
    id: "register",
    numeric: true,
    disablePadding: false,
    label: "REGISTER DATE",
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
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
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

// interface CommunityArticleListProps {
//   articles: BoardArticle[];
//   anchorEl: any;
//   menuIconClickHandler: any;
//   menuIconCloseHandler: any;
//   updateArticleHandler: any;
//   removeArticleHandler: any;
// }

const CommunityArticleList = () => {
  //   const {
  //     articles,
  //     anchorEl,
  //     menuIconClickHandler,
  //     menuIconCloseHandler,
  //     updateArticleHandler,
  //     removeArticleHandler,
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
              <TableCell align="left">12345678</TableCell>
              <TableCell align="left">
                <Box component={"div"}>
                  The bester
                  <Link
                    href={`/community/detail?articleCategory=`}
                    className={"img_box"}
                  >
                    <IconButton className="btn_window">
                      <Tooltip title={"Open window"}>
                        <OpenInBrowserRoundedIcon />
                      </Tooltip>
                    </IconButton>
                  </Link>
                </Box>
              </TableCell>
              <TableCell align="left">PHOTOGRAPH</TableCell>
              <TableCell align="left" className={"name"}>
                <Link href={`/member?memberId=`}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/img/banner/d.avif"
                    sx={{ ml: "2px", mr: "10px" }}
                  />
                  Ned
                </Link>
              </TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="left">
                <Moment format={"DD.MM.YY HH:mm"}>2025.08.08</Moment>
              </TableCell>
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
                <>
                  <Button className={"badge success"}>ACTIVE</Button>

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
                      <Typography
                        variant={"subtitle1"}
                        component={"span"}
                      ></Typography>
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

export default CommunityArticleList;
