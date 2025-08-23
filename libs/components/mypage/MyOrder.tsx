import {
  Box,
  Typography,
  Card,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Stack,
  Pagination,
  Divider,
  CardContent,
  Modal,
  TextField,
  Rating,
} from "@mui/material";
import {
  Delete,
  ArrowDropDown,
  LocationOn,
  AttachMoney,
  AccessTime,
  RateReview,
  Close,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { NextPage } from "next";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { CREATE_REVIEW, UPDATE_ORDER } from "@/apollo/user/mutation";
import { GET_MY_ORDERS } from "@/apollo/user/query";
import { OrderStatus } from "@/libs/enums/order.enum";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import { Order, OrderItem } from "@/libs/types/order/order";
import { OrderInquiry } from "@/libs/types/order/order.input";
import { T } from "@/libs/types/common";
import { Review } from "@/libs/types/review-post/review";
import axios from "axios";
import { getJwtToken } from "@/libs/auth";
import { CreateReviewInput } from "@/libs/types/review-post/review.input";

const initialValues: CreateReviewInput = {
  reviewRating: 0,
  reviewComments: "",
  reviewImages: [], // shu joy qo‘shilishi kerak
  orderItemId: "",
  memberId: "",
};

const MyOrder: NextPage = ({ initialInput, ...props }: any) => {
  const user = useReactiveVar(userVar);
  const inputRef = useRef<any>(null);
  const token = getJwtToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [insertReviewyData, setInsertReviewyData] =
    useState<CreateReviewInput>(initialValues);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchFilter, setSearchFilter] = useState<OrderInquiry>(initialInput);
  const [total, setTotal] = useState<number>(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  /** Review Modal **/
  const [openReview, setOpenReview] = useState(false);
  const [reviewRating, setReviewRating] = useState<number | null>(0);
  const [reviewComments, setReviewComments] = useState("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [activeOrderItem, setActiveOrderItem] = useState<OrderItem | null>(
    null
  );

  /** APOLLO REQUESTS **/
  const [createReview] = useMutation(CREATE_REVIEW);
  const [updateOrder] = useMutation(UPDATE_ORDER);

  const { data: getOrdersData, refetch: getOrdersRefetch } = useQuery(
    GET_MY_ORDERS,
    {
      fetchPolicy: "network-only",
      variables: {
        input: {
          ...initialInput,
          search: { memberId: user?._id },
        },
      },
      onCompleted: (data: T) => {
        setOrders(data?.getMyOrders?.list || []);
        setTotal(data?.getMyOrders?.metaCounter[0]?.total ?? 0);
      },
    }
  );

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

  async function uploadImages() {
    try {
      const formData = new FormData();
      const selectedFiles = inputRef.current.files;

      if (selectedFiles.length === 0) return false;
      if (selectedFiles.length > 5)
        throw new Error("Cannot upload more than 5 images!");

      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
            imagesUploader(files: $files, target: $target)
          }`,
          variables: {
            files: [null, null, null, null, null],
            target: "review",
          },
        })
      );
      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.files.0"],
          "1": ["variables.files.1"],
          "2": ["variables.files.2"],
          "3": ["variables.files.3"],
          "4": ["variables.files.4"],
        })
      );
      for (const key in selectedFiles) {
        if (/^\d+$/.test(key)) formData.append(`${key}`, selectedFiles[key]);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_GRAPHQL_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseImages = response.data.data.imagesUploader;
      setInsertReviewyData({
        ...insertReviewyData,
        reviewImages: responseImages,
      });
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }

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

  /** Review Submit **/
  const handleOpenReview = (order: Order, orderItem: OrderItem) => {
    setActiveOrder(order);
    setActiveOrderItem(orderItem);
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
    setReviewRating(3);
    setReviewComments("");
    setActiveOrder(null);
  };

  const handleSubmitReview = async () => {
    if (!activeOrderItem) return;

    try {
      await createReview({
        variables: {
          input: {
            reviewRating,
            reviewComments,
            reviewImages: insertReviewyData.reviewImages,
            orderItemId: activeOrderItem._id,
            providerId: activeOrderItem.providerId,
          },
        },
      });

      setOpenReview(false);
      setReviewSubmitted(true);
      await sweetTopSmallSuccessAlert("Review submitted!", 1000, false);
      handleCloseReview();
      setInsertReviewyData(initialValues);
    } catch (err: any) {
      sweetErrorHandling(err);
    }
  };

  const handleRemoveImage = (idx: number) => {
    setInsertReviewyData((prev) => ({
      ...prev,
      reviewImages: (prev.reviewImages ?? []).filter((_, i) => i !== idx),
    }));
  };

  console.log("orders =>", orders);

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
            <Card
              key={order._id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": { boxShadow: 2 },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  {/* LEFT INFO */}
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">
                        {order.address?.street}, {order.address?.city},{" "}
                        {order.address?.zipcode}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <AttachMoney fontSize="small" sx={{ color: "green" }} />
                      <span>Total Price:</span>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="green"
                      >
                        ${order.totalPrice}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={1}
                    >
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="caption" color="gray">
                        {new Date(order.createdAt).toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* RIGHT ACTIONS */}
                  <Stack spacing={1} alignItems="flex-end">
                    <Button
                      size="small"
                      sx={{
                        borderRadius: 20,
                        px: 2,
                        bgcolor: getStatusColor(order.orderStatus),
                        color: "#fff",
                        "&:hover": {
                          bgcolor: getStatusColor(order.orderStatus),
                        },
                      }}
                      endIcon={<ArrowDropDown />}
                      onClick={(e) => handleStatusClick(e, order._id)}
                    >
                      {order.orderStatus}
                    </Button>

                    {order.orderStatus === OrderStatus.COMPLETED &&
                      order.orderItems?.map((item: any) => (
                        <Button
                          key={item._id}
                          size="small"
                          variant="outlined"
                          startIcon={<RateReview />}
                          onClick={() => handleOpenReview(order, item)}
                          sx={{ borderRadius: 20, mt: 1 }}
                        >
                          Leave Review
                        </Button>
                      ))}
                  </Stack>
                </Stack>
              </CardContent>
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
            </Card>
          ))
        )}
      </Box>

      {/* Review Modal */}
      <Modal sx={{ gap: "26px" }} open={openReview} onClose={handleCloseReview}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 3,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Leave a Review
          </Typography>
          <Rating
            value={reviewRating}
            onChange={(_, newValue) => setReviewRating(newValue)}
            size="large"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Comments"
            multiline
            // rows={4}
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              mb: 2,
              background: "green",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Upload Images
            <input
              ref={inputRef}
              type="file"
              hidden
              multiple
              accept="image/jpg, image/jpeg, image/png"
              onChange={uploadImages}
            />
          </Button>
          <Box display="flex" gap={1} flexWrap="wrap">
            {insertReviewyData.reviewImages?.map(
              (image: string, idx: number) => {
                const imagePath = image.includes("http")
                  ? image
                  : `${process.env.REACT_APP_API_URL}/${image}`;

                return (
                  <Stack
                    key={idx}
                    className="image-box"
                    sx={{ position: "relative", width: 80, height: 80 }}
                  >
                    <img
                      src={imagePath}
                      alt={`preview-${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                      }}
                      onClick={() => handleRemoveImage(idx)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Stack>
                );
              }
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              onClick={handleCloseReview}
              sx={{
                "&:hover": {
                  bgcolor: "red",
                  color: "#fff",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "green",
                color: "#fff",
                "&:hover": {
                  bgcolor: "green",
                },
              }}
              onClick={handleSubmitReview}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>

      {orders.length !== 0 && (
        <Stack className="pagination-config-orders">
          <Stack className="pagination-box">
            <Pagination
              count={Math.ceil(total / searchFilter.limit)}
              page={searchFilter.page}
              shape="circular"
              color="secondary"
              onChange={paginationHandler}
            />
          </Stack>
          <Stack className="total-result">
            <Typography>{total} orders available</Typography>
          </Stack>
        </Stack>
      )}
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
