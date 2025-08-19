import {
  Box,
  Typography,
  Avatar,
  Card,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import { Delete, ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import { NextPage } from "next";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { UPDATE_ORDER } from "@/apollo/user/mutation";
import { GET_MY_ORDERS } from "@/apollo/user/query";
import { OrderStatus } from "@/libs/enums/order.enum";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { Order } from "@/libs/types/order/order";
import { OrderInquiry } from "@/libs/types/order/order.input";
import { T } from "@/libs/types/common";

const MyOrder: NextPage = ({ initialInput, ...props }: any) => {
  const user = useReactiveVar(userVar);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchFilter, setSearchFilter] = useState<OrderInquiry>(initialInput);
  const [total, setTotal] = useState<number>(0);

  const [updateOrder] = useMutation(UPDATE_ORDER);

  const {
    loading: getOrdersLoading,
    data: getOrdersData,
    error: getOrdersError,
    refetch: getOrdersRefetch,
  } = useQuery(GET_MY_ORDERS, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        ...initialInput,
        search: { memberId: user?._id }, // 🔑 faqat userning orderlari
      },
    },
    notifyOnNetworkStatusChange: true,

    onCompleted: (data: T) => {
      setOrders(data?.getMyOrders?.list || []);
      setTotal(data?.getMyOrders?.metaCounter[0]?.total ?? 0);
    },
  });

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
  };

  const handleStatusClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const updateOrderHandler = async (status: OrderStatus, id: string) => {
    try {
      if (await sweetConfirmAlert(`Change status to ${status}?`)) {
        await updateOrder({
          variables: { input: { _id: id, orderStatus: status } },
        });
        await getOrdersRefetch({ input: initialInput });
        handleMenuClose();
      }
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  };

  const getAvailableStatuses = (order: any) => {
    const isUser = user.memberType === "USER";
    switch (order.orderStatus) {
      case OrderStatus.PENDING:
        return isUser
          ? [OrderStatus.CANCELED]
          : [OrderStatus.CONFIRMED, OrderStatus.REJECTED];
      case OrderStatus.CONFIRMED:
        return isUser
          ? [OrderStatus.CANCELED]
          : [OrderStatus.IN_PROGRESS, OrderStatus.REJECTED];
      case OrderStatus.IN_PROGRESS:
        return isUser ? [OrderStatus.CANCELED] : [OrderStatus.COMPLETED];
      default:
        return [];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "#FFA500";
      case OrderStatus.CONFIRMED:
        return "#1976d2";
      case OrderStatus.IN_PROGRESS:
        return "#9C27B0";
      case OrderStatus.COMPLETED:
        return "#4CAF50";
      case OrderStatus.CANCELED:
        return "#f44336";
      default:
        return "#757575";
    }
  };
  console.log("order.providerData =>", orders);

  return (
    <Box className="order-box">
      <Typography className="title">My Orders</Typography>

      <Box className="order-list">
        {orders.length === 0 ? (
          <div className={"no-data"}>
            <img src="/img/icons/icoAlert.svg" alt="" />
            <p>No Order found!</p>
          </div>
        ) : (
          orders.map((order: Order) => (
            <Card key={order._id} className="order-card">
              <Box className="card-left">
                <Avatar src={"/img/order-img.png"} className="avatar" />
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography className="name" sx={{ color: "black" }}>
                    Web Tax
                  </Typography>
                  <Typography className="price" sx={{ color: "green" }}>
                    ${order.webTax}
                  </Typography>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    +
                  </Typography>
                  <Typography className="name" sx={{ color: "black" }}>
                    Order Price
                  </Typography>
                  <Typography className="price" sx={{ color: "green" }}>
                    ${order.orderPrice}
                  </Typography>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    =
                  </Typography>
                  <Typography className="name" sx={{ color: "black" }}>
                    Total
                  </Typography>
                  <Typography className="price" sx={{ color: "green" }}>
                    ${order.totalPrice}
                  </Typography>
                  <Typography
                    className="date"
                    sx={{ marginLeft: "auto", color: "gray" }}
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box className="card-right">
                <Button
                  className="status-btn"
                  style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                  endIcon={<ArrowDropDown />}
                  onClick={(e) => handleStatusClick(e, order._id)}
                >
                  {order.orderStatus}
                </Button>

                {getAvailableStatuses(order).includes(OrderStatus.CANCELED) && (
                  <IconButton
                    onClick={() =>
                      updateOrderHandler(OrderStatus.CANCELED, order._id)
                    }
                    className="delete-btn"
                  >
                    <Delete />
                  </IconButton>
                )}

                {selectedOrderId === order._id && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {getAvailableStatuses(order).map((status) => (
                      <MenuItem
                        key={status}
                        onClick={() => updateOrderHandler(status, order._id)}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            </Card>
          ))
        )}
        {orders.length !== 0 && (
          <Stack className="pagination-config-orders">
            <Stack className="pagination-box">
              <Pagination
                count={Math.ceil(total / searchFilter.limit)}
                page={searchFilter.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </Stack>
            <Stack className="total-result">
              <Typography>{total} orders available</Typography>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

MyOrder.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    search: {},
  },
};

export default MyOrder;
