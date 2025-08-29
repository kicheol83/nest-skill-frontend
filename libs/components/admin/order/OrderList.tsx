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
import { ProviderStatus } from "@/libs/enums/provider.enum";
import { OrderStatus } from "@/libs/enums/order.enum";
import { Order } from "@/libs/types/order/order";
import Moment from "react-moment";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

interface Data {
  id: string;
  date: string;
  price: string;
  member: string;
  webTax: string;
  totalPrice: string;
  status: string;
}

type Sorting = "asc" | "desc";

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
    label: "ORDER ID",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "DATE",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "PRICE",
  },
  {
    id: "member",
    numeric: false,
    disablePadding: false,
    label: "MEMBER",
  },
  {
    id: "webTax",
    numeric: false,
    disablePadding: false,
    label: "WEB TAX",
  },
  {
    id: "totalPrice",
    numeric: false,
    disablePadding: false,
    label: "TOTAL PRICE",
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
  order: Sorting;
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
  orders: Order[];
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateOrdersHandler: any;
  removeOrdersHandler: any;
}

export const OrderPanelList = (props: ProviderPanelListType) => {
  const {
    orders,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    updateOrdersHandler,
    removeOrdersHandler,
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
            {orders.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className={"no-data"}>data not found!</span>
                </TableCell>
              </TableRow>
            )}

            {orders.length !== 0 &&
              orders.map((order: Order, index: number) => {
                return (
                  <TableRow
                    hover
                    key={order?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{order._id}</TableCell>
                    <TableCell align="left" className={"name"}>
                      {order.orderStatus === OrderStatus.PENDING ? (
                        <Stack direction={"row"}>
                          <Link href={`/order/detail?id=${order?._id}`}>
                            <div>
                              <QueryBuilderIcon
                                sx={{ ml: "2px", mr: "10px", mt: "6.5px" }}
                              />
                            </div>
                          </Link>
                          <Link href={`/service/detail?id=${order?._id}`}>
                            <Moment format="DD MMMM, YYYY">
                              {order.createdAt}
                            </Moment>
                          </Link>
                        </Stack>
                      ) : (
                        <Stack direction={"row"}>
                          <div>
                            <QueryBuilderIcon
                              sx={{ ml: "2px", mr: "10px", mt: "6.5px" }}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <Moment format="DD MMMM, YYYY">
                              {order.createdAt}
                            </Moment>
                          </div>
                        </Stack>
                      )}
                    </TableCell>
                    <TableCell align="center">{order.orderPrice} $</TableCell>
                    <TableCell align="center">
                      {order.memberData?.memberNick}
                    </TableCell>
                    <TableCell align="center">{order.webTax} %</TableCell>
                    <TableCell align="center">{order.totalPrice} $</TableCell>
                    <TableCell align="center">
                      {order.orderStatus === OrderStatus.CANCELED && (
                        <Button
                          variant="outlined"
                          sx={{
                            p: "3px",
                            border: "none",
                            ":hover": { border: "1px solid #000000" },
                          }}
                          onClick={() => removeOrdersHandler(order._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      )}

                      {order.orderStatus === OrderStatus.COMPLETED && (
                        <Button className={"badge warning"}>
                          {order.orderStatus}
                        </Button>
                      )}

                      {order.orderStatus === OrderStatus.PENDING && (
                        <>
                          <Button
                            onClick={(e: any) => menuIconClickHandler(e, index)}
                            className={"badge success"}
                          >
                            {order.orderStatus}
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
                            {Object.values(OrderStatus)
                              .filter((ele) => ele !== order.orderStatus)
                              .map((status: string) => (
                                <MenuItem
                                  onClick={() =>
                                    updateOrdersHandler({
                                      _id: order._id,
                                      orderStatus: status,
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
