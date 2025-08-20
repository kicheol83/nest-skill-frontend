import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import { TabContext } from "@mui/lab";
import TablePagination from "@mui/material/TablePagination";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
} from "../../../libs/sweetAlert";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ORDER_BY_ADMIN } from "../../../apollo/admin/mutation";
import { GET_ALL_ORDERS_BY_ADMIN } from "../../../apollo/admin/query";
import { T } from "../../../libs/types/common";

import { Order } from "@/libs/types/order/order";
import { OrdersInquiry } from "@/libs/types/order/order.input";
import { UpdateOrderInput } from "@/libs/types/order/order.update";
import { OrderStatus } from "@/libs/enums/order.enum";
import { OrderPanelList } from "@/libs/components/admin/order/OrderList";

const AdminOrders: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [ordersInquiry, setOrdersInquiry] =
    useState<OrdersInquiry>(initialInquiry);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersTotal, setOrdersTotal] = useState<number>(0);
  const [value, setValue] = useState(
    ordersInquiry?.search?.orderStatus
      ? ordersInquiry?.search?.orderStatus
      : "ALL"
  );

  /** APOLLO REQUESTS **/
  const [updateOrderByAdmin] = useMutation(UPDATE_ORDER_BY_ADMIN);
  const [removeOrderByAdmin] = useMutation(UPDATE_ORDER_BY_ADMIN);

  const {
    loading: getAllOrdersByAdminLoading,
    data: getAllOrdersByAdminData,
    error: getAllOrdersByAdminError,
    refetch: getAllOrdersByAdminRefetch,
  } = useQuery(GET_ALL_ORDERS_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: ordersInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setOrders(data?.getAllOrdersByAdmin?.list);
      setOrdersTotal(data?.getAllOrdersByAdmin.metaCounter[0]?.total);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllOrdersByAdminRefetch({ input: ordersInquiry });
  }, [ordersInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    ordersInquiry.page = newPage + 1;
    await getAllOrdersByAdminRefetch({ input: ordersInquiry });
    setOrdersInquiry({ ...ordersInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    ordersInquiry.limit = parseInt(event.target.value, 10);
    ordersInquiry.page = 1;
    await getAllOrdersByAdminRefetch({ input: ordersInquiry });
    setOrdersInquiry({ ...ordersInquiry });
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

    setOrdersInquiry({
      ...ordersInquiry,
      page: 1,
      sort: "createdAt",
    });

    switch (newValue) {
      case "PENDING":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.PENDING },
        });
        break;
      case "CONFIRMED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.CONFIRMED },
        });
        break;
      case "IN_PROGRESS":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.IN_PROGRESS },
        });
        break;
      case "COMPLETED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.COMPLETED },
        });
        break;
      case "PAID":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.PAID },
        });
        break;
      case "CANCELED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.CANCELED },
        });
        break;
      case "REJECTED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.REJECTED },
        });
        break;
      case "EXPIRED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.EXPIRED },
        });
        break;
      case "REFUNDED":
        setOrdersInquiry({
          ...ordersInquiry,
          search: { orderStatus: OrderStatus.REFUNDED },
        });
        break;
      default:
        delete ordersInquiry?.search?.orderStatus;
        setOrdersInquiry({ ...ordersInquiry });
        break;
    }
  };

  const removeOrdersHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to remove?")) {
      }
      menuIconCloseHandler();
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const updateOrdersHandler = async (updateData: UpdateOrderInput) => {
    try {
      console.log("+updateData: ", updateData);
      await updateOrderByAdmin({
        variables: {
          input: updateData,
        },
      });
      menuIconCloseHandler();
      await getAllOrdersByAdminRefetch({ input: ordersInquiry });
    } catch (err: any) {
      menuIconCloseHandler();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Order List
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
                  onClick={(e: any) => tabChangeHandler(e, "PENDING")}
                  value="PENDING"
                  className={value === "PENDING" ? "li on" : "li"}
                >
                  Pending
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "CONFIRMED")}
                  value="CONFIRMED"
                  className={value === "CONFIRMED" ? "li on" : "li"}
                >
                  Confirmend
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "IN_PROGRESS")}
                  value="IN_PROGRESS"
                  className={value === "IN_PROGRESS" ? "li on" : "li"}
                >
                  In Progress
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "COMPLETED")}
                  value="COMPLETED"
                  className={value === "COMPLETED" ? "li on" : "li"}
                >
                  Completed
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "CANCELED")}
                  value="CANCELED"
                  className={value === "CANCELED" ? "li on" : "li"}
                >
                  Canceled
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "REJECTED")}
                  value="REJECTED"
                  className={value === "REJECTED" ? "li on" : "li"}
                >
                  Rejected
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "EXPIRED")}
                  value="EXPIRED"
                  className={value === "EXPIRED" ? "li on" : "li"}
                >
                  Expired
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "PAID")}
                  value="PAID"
                  className={value === "PAID" ? "li on" : "li"}
                >
                  Paid
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "REFUNDED")}
                  value="REFUNDED"
                  className={value === "REFUNDED" ? "li on" : "li"}
                >
                  Refunded
                </ListItem>
              </List>
              <Divider />
              <Divider />
            </Box>
            <OrderPanelList
              orders={orders}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updateOrdersHandler={updateOrdersHandler}
              removeOrdersHandler={removeOrdersHandler}
            />

            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={ordersTotal}
              rowsPerPage={ordersInquiry?.limit}
              page={ordersInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminOrders.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default withAdminLayout(AdminOrders);
