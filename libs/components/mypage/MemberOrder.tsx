import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { NextPage } from "next";
import { userVar } from "@/apollo/store";
import { GET_ORDERS_BY_PROVIDER } from "@/apollo/provider/query";
import { UPDATE_MY_ORDER_BY_PROVIDER } from "@/apollo/provider/mutation";
import { OrderInquiry } from "@/libs/types/order/order.input";
import { T } from "@/libs/types/common";
import { Order } from "@/libs/types/order/order";

const MemberOrder: NextPage = ({ initialInput, ...props }: any) => {
  const user = useReactiveVar(userVar);
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<OrderInquiry>(initialInput);

  const { data, loading, refetch } = useQuery(GET_ORDERS_BY_PROVIDER, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
  });

  const [updateOrderStatus] = useMutation(UPDATE_MY_ORDER_BY_PROVIDER);

  // Update orders state whenever query data changes
  useEffect(() => {
    setOrders(data?.getOrdersByProvider?.list || []);
    setTotal(
      data?.getOrdersByProvider?.metaCounter?.[0]?.total ??
        data?.getOrdersByProvider?.list.length ??
        0
    );
  }, [data]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({
        variables: { input: { _id: orderId, orderStatus: newStatus } },
      });
      refetch();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const paginationHandler = (_event: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
    refetch({ input: { ...searchFilter, page: value } });
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  // Empty state
  if (orders.length === 0) {
    return (
      <Box ml={40} textAlign="center" mt={15}>
        <Typography sx={{ fontFamily: "Space Grotesk" }} variant="h1" mb={3}>
          Provider - Orders
        </Typography>
        <div className={"no-data"}>
          <img src="/img/icons/icoAlert.svg" alt="" />
          <p>No Order found!</p>
        </div>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography sx={{ fontFamily: "Space Grotesk" }} variant="h1" mb={3}>
        Provider - Orders
      </Typography>

      {orders.map((order: Order) => (
        <Box
          width={"936px"}
          key={order._id}
          mb={3}
          mt={8}
          p={3}
          borderRadius={3}
          boxShadow={3}
          sx={{
            backgroundColor: "#ffffff",
            borderLeft: "6px solid #1976d2",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-3px)",
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{ fontFamily: "Space Grotesk" }}
              variant="h6"
              color="primary"
            >
              Order ID: {order._id}
            </Typography>
            <Typography
              variant="subtitle2"
              color={
                order.orderStatus === "CANCELED"
                  ? "error.main"
                  : order.orderStatus === "REJECTED"
                  ? "warning.main"
                  : "success.main"
              }
            >
              {order.orderStatus}
            </Typography>
          </Stack>

          <Typography
            sx={{ fontFamily: "Space Grotesk" }}
            mt={1}
            fontWeight={500}
          >
            Total Price: ${order.totalPrice}
          </Typography>
          <Typography sx={{ fontFamily: "Space Grotesk" }} mt={0.5}>
            Customer: <strong>{order.memberData?.memberNick}</strong> (
            {order.memberData?.memberPhone})
          </Typography>
          <Typography sx={{ fontFamily: "Space Grotesk" }} mt={0.5}>
            Address: {order.address?.fullName}, {order.address?.city},{" "}
            {order.address?.phone}
          </Typography>

          <Box mt={2}>
            <Typography sx={{ fontFamily: "Space Grotesk" }} fontWeight={800}>
              Items:
            </Typography>
            {order.orderItems?.map((item) => (
              <Typography
                sx={{ fontFamily: "Space Grotesk" }}
                key={item._id}
                ml={2}
                mt={0.3}
              >
                • {order.providerData?.[0]?.providerTitle || "Unknown Provider"}{" "}
                ({order.providerData?.[0]?.providerType || "N/A"}) - $
                {item.itemPrice}
              </Typography>
            ))}
          </Box>

          <Stack mt={3} direction="row" spacing={2} alignItems="center">
            <Select
              value={order.orderStatus}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              size="small"
              sx={{ width: "200px" }}
            >
              <MenuItem value="CANCELED">CANCELED</MenuItem>
              <MenuItem value="REJECTED">REJECTED</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(order._id, order.orderStatus)}
              sx={{
                fontFamily: "Space Grotesk",
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1976d2", // hover rangini o'zgartirmaymiz
                },
              }}
            >
              Update Status
            </Button>
          </Stack>
        </Box>
      ))}

      {orders.length !== 0 && (
        <Stack
          className="pagination-config-orders"
          ml={"50%"}
          mt={3}
          alignItems="center"
        >
          <Pagination
            count={Math.ceil(total / searchFilter.limit)}
            page={searchFilter.page}
            shape="circular"
            color="secondary"
            onChange={paginationHandler}
          />
          <Typography mt={1}>{total} orders available</Typography>
        </Stack>
      )}
    </Box>
  );
};

MemberOrder.defaultProps = {
  initialInput: {
    page: 1,
    limit: 2,
    sort: "createdAt",
    search: {},
  },
};

export default MemberOrder;
