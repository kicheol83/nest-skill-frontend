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
import { REACT_APP_API_URL } from "../../../config";
import { Payment } from "@/libs/types/payment/payment";
import { PaymentMethod, PaymentStatus } from "@/libs/enums/payment.enum";

interface Data {
  id: string;
  nickname: string;
  fullname: string;
  phone: string;
  type: string;
  state: string;
  transactionId: string;
  amaount: number;
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
    label: "PAYMENT ID",
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
    label: "METHOD TYPE",
  },
  {
    id: "transactionId",
    numeric: false,
    disablePadding: false,
    label: "TR ID",
  },
  {
    id: "amaount",
    numeric: false,
    disablePadding: false,
    label: "AMOUNT",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "STATE",
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

interface MemberPanelListType {
  payment: Payment[];
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updatePaymentHandler: any;
}

export const PaymentList = (props: MemberPanelListType) => {
  const {
    payment,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    updatePaymentHandler,
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
            {payment.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className={"no-data"}>data not found!</span>
                </TableCell>
              </TableRow>
            )}

            {payment.length !== 0 &&
              payment.map((payment: Payment, index: number) => {
                const member_image = payment.memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${payment.memberData?.memberNick}`
                  : "/img/profile/defaultUser.svg";
                return (
                  <TableRow
                    hover
                    key={payment?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{payment._id}</TableCell>

                    <TableCell align="left" className={"name"}>
                      <Stack direction={"row"}>
                        <Link href={`/member?memberId=${payment._id}`}>
                          <div>
                            <Avatar
                              alt="Remy Sharp"
                              src={member_image}
                              sx={{ ml: "2px", mr: "10px" }}
                            />
                          </div>
                        </Link>
                        <Link href={`/member?memberId=${payment._id}`}>
                          <div>{payment.memberData?.memberNick}</div>
                        </Link>
                      </Stack>
                    </TableCell>

                    <TableCell align="center">
                      {payment.memberData?.memberFullName ?? "-"}
                    </TableCell>
                    <TableCell align="left">
                      {payment.memberData?.memberPhone}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        onClick={(e: any) => menuIconClickHandler(e, index)}
                        className={"badge success"}
                      >
                        {payment.paymentMethod}
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
                        {Object.values(PaymentMethod)
                          .filter((ele) => ele !== payment?.paymentMethod)
                          .map((type: string) => (
                            <MenuItem
                              onClick={() =>
                                updatePaymentHandler({
                                  _id: payment._id,
                                  paymentMethod: type,
                                })
                              }
                              key={type}
                            >
                              <Typography
                                variant={"subtitle1"}
                                component={"span"}
                              >
                                {type}
                              </Typography>
                            </MenuItem>
                          ))}
                      </Menu>
                    </TableCell>

                    <TableCell align="center">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell align="center">
                      {payment.paymentAmount}$
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={(e: any) =>
                          menuIconClickHandler(e, payment._id)
                        }
                        className={"badge success"}
                      >
                        {payment.paymentStatus}
                      </Button>

                      <Menu
                        className={"menu-modal"}
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl[payment._id]}
                        open={Boolean(anchorEl[payment._id])}
                        onClose={menuIconCloseHandler}
                        TransitionComponent={Fade}
                        sx={{ p: 1 }}
                      >
                        {Object.values(PaymentStatus)
                          .filter(
                            (ele: string) => ele !== payment?.paymentStatus
                          )
                          .map((status: string) => (
                            <MenuItem
                              onClick={() =>
                                updatePaymentHandler({
                                  _id: payment._id,
                                  paymentStatus: status,
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
