import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, InputAdornment, List, ListItem, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import TablePagination from "@mui/material/TablePagination";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PAYMENTS_BY_ADMIN } from "../../../apollo/admin/query";
import { T } from "../../../libs/types/common";
import { AllPaymentsInquiry } from "@/libs/types/payment/payment.input";
import { Payment } from "@/libs/types/payment/payment";
import { UPDATE_PAYMENT } from "@/apollo/user/mutation";
import { PaymentMethod, PaymentStatus } from "@/libs/enums/payment.enum";
import { UpdatePaymentInput } from "@/libs/types/payment/payment.update";
import { PaymentList } from "@/libs/components/admin/pament/PaymentList";

const AdminPayment: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [paymentsInquiry, setPaymentsInquiry] =
    useState<AllPaymentsInquiry>(initialInquiry);
  const [payment, setPayment] = useState<Payment[]>([]);
  const [membersTotal, setMembersTotal] = useState<number>(0);
  const [value, setValue] = useState(
    paymentsInquiry?.search?.paymentStatus
      ? paymentsInquiry?.search?.paymentStatus
      : "ALL"
  );
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("ALL");

  /** APOLLO REQUESTS **/
  const [updatePaymentByAdmin] = useMutation(UPDATE_PAYMENT);

  const {
    loading: getAllPaymentsByAdminLoading,
    data: getAllPaymentsByAdminsData,
    error: getAllPaymentsByAdminError,
    refetch: getAllPAymentsRefetch,
  } = useQuery(GET_PAYMENTS_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: paymentsInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setPayment(data?.getPaymentsByAdmin?.list);
      setMembersTotal(data?.getPaymentsByAdmin?.metaCounter[0]?.total ?? 0);
    },
  });
  /** LIFECYCLES **/
  useEffect(() => {
    getAllPAymentsRefetch({ input: paymentsInquiry }).then();
  }, [paymentsInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    paymentsInquiry.page = newPage + 1;
    setPaymentsInquiry({ ...paymentsInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    paymentsInquiry.limit = parseInt(event.target.value, 10);
    paymentsInquiry.page = 1;
    await getAllPAymentsRefetch({ input: paymentsInquiry });
    setPaymentsInquiry({ ...paymentsInquiry });
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
    setSearchText("");

    setPaymentsInquiry({ ...paymentsInquiry, page: 1, sort: "createdAt" });

    switch (newValue) {
      case "FAILED":
        setPaymentsInquiry({
          ...paymentsInquiry,
          search: { paymentStatus: PaymentStatus.FAILED },
        });
        break;
      case "PAID":
        setPaymentsInquiry({
          ...paymentsInquiry,
          search: { paymentStatus: PaymentStatus.PAID },
        });
        break;
      case "PENDING":
        setPaymentsInquiry({
          ...paymentsInquiry,
          search: { paymentStatus: PaymentStatus.PENDING },
        });
        break;
      case "REFUNDED":
        setPaymentsInquiry({
          ...paymentsInquiry,
          search: { paymentStatus: PaymentStatus.REFUNDED },
        });
        break;
      default:
        delete paymentsInquiry?.search?.paymentStatus;
        setPaymentsInquiry({ ...paymentsInquiry });
        break;
    }
  };

  const updatePaymentHandler = async (input: UpdatePaymentInput) => {
    try {
      await updatePaymentByAdmin({
        variables: { input },
      });
      menuIconCloseHandler();
      await getAllPAymentsRefetch({ input: paymentsInquiry });
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const textHandler = useCallback((value: string) => {
    try {
      setSearchText(value);
    } catch (err: any) {
      console.log("textHandler: ", err.message);
    }
  }, []);

  const searchTextHandler = async () => {
    try {
      setPaymentsInquiry({
        ...paymentsInquiry,
        search: {
          ...paymentsInquiry.search,
          text: searchText,
        },
      });
    } catch (err: any) {
      console.log("searchTextHandler: ", err.message);
    }
  };

  const searchTypeHandler = async (newValue: string) => {
    try {
      setSearchType(newValue);

      if (newValue !== "ALL") {
        setPaymentsInquiry({
          ...paymentsInquiry,
          page: 1,
          sort: "createdAt",
          search: {
            ...paymentsInquiry.search,
            paymentMethod: newValue as PaymentMethod,
          },
        });
      } else {
        delete paymentsInquiry?.search?.paymentMethod;
        setPaymentsInquiry({ ...paymentsInquiry });
      }
    } catch (err: any) {
      console.log("searchTypeHandler: ", err.message);
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Typography variant={"h2"} className={"tit"} sx={{ mb: "24px" }}>
        Payment List
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
                  onClick={(e: any) => tabChangeHandler(e, "FAILED")}
                  value="FAILED"
                  className={value === "FAILED" ? "li on" : "li"}
                >
                  FAILED
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "PAID")}
                  value="PAID"
                  className={value === "PAID" ? "li on" : "li"}
                >
                  PAID
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "PENDING")}
                  value="PENDING"
                  className={value === "PENDING" ? "li on" : "li"}
                >
                  PENDING
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "REFUNDED")}
                  value="REFUNDED"
                  className={value === "REFUNDED" ? "li on" : "li"}
                >
                  REFUNDED
                </ListItem>
              </List>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <OutlinedInput
                  value={searchText}
                  onChange={(e: any) => textHandler(e.target.value)}
                  sx={{ width: "100%" }}
                  className={"search"}
                  placeholder="Search payment"
                  onKeyDown={(event) => {
                    if (event.key == "Enter") searchTextHandler();
                  }}
                  endAdornment={
                    <>
                      {searchText && (
                        <CancelRoundedIcon
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            setSearchText("");
                            setPaymentsInquiry({
                              ...paymentsInquiry,
                              search: {
                                ...paymentsInquiry.search,
                                text: "",
                              },
                            });
                            await getAllPAymentsRefetch({
                              input: paymentsInquiry,
                            });
                          }}
                        />
                      )}
                      <InputAdornment
                        position="end"
                        onClick={() => searchTextHandler()}
                      >
                        <img
                          src="/img/icons/search_icon.png"
                          alt={"searchIcon"}
                        />
                      </InputAdornment>
                    </>
                  }
                />
                <Select sx={{ width: "160px", ml: "20px" }} value={searchType}>
                  <MenuItem
                    value={"ALL"}
                    onClick={() => searchTypeHandler("ALL")}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    value={"CARD"}
                    onClick={() => searchTypeHandler("CARD")}
                  >
                    CARD
                  </MenuItem>
                  <MenuItem
                    value={"BANK_TRANSFER"}
                    onClick={() => searchTypeHandler("BANK_TRANSFER")}
                  >
                    BANK_TRANSFER
                  </MenuItem>
                  <MenuItem
                    value={"CASH"}
                    onClick={() => searchTypeHandler("CASH")}
                  >
                    CASH
                  </MenuItem>
                  <MenuItem
                    value={"VIRTUAL"}
                    onClick={() => searchTypeHandler("VIRTUAL")}
                  >
                    VIRTUAL
                  </MenuItem>
                </Select>
              </Stack>
              <Divider />
            </Box>
            <PaymentList
              payment={payment}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updatePaymentHandler={updatePaymentHandler}
            />

            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={membersTotal}
              rowsPerPage={paymentsInquiry?.limit}
              page={paymentsInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

AdminPayment.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    search: {},
  },
};

export default withAdminLayout(AdminPayment);
