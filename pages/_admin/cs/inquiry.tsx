import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import TablePagination from "@mui/material/TablePagination";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { FaqArticlesPanelList } from "../../../libs/components/admin/cs/FaqList";
import withAdminLayout from "@/libs/components/layout/LayoutAdmin";
import { NoticeInquiry } from "@/libs/types/notice/notice.input";
import { Notice } from "@/libs/types/notice/notice";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_NOTICE_BY_ADMIN,
  DELETE_NOTICE_BY_ADMIN,
  UPDATE_NOTICE_BY_ADMIN,
} from "@/apollo/admin/mutation";
import { GET_NOTICES_BY_ADMIN } from "@/apollo/admin/query";
import { NoticeCategory, NoticeStatus } from "@/libs/enums/notice.enum";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "@/libs/sweetAlert";
import { NoticeUpdate } from "@/libs/types/notice/notice.update";
import { T } from "@/libs/types/common";
import { InquiryList } from "@/libs/components/admin/cs/InquiryList";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const FaqArticles: NextPage = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [faqInquiry, setFaqInquiry] = useState<NoticeInquiry>({
    page: 1,
    limit: 6,
    search: {},
  });
  const [notices, setNotices] = useState<Notice[]>([]);
  const [faqTotal, setFaqTotal] = useState<number>(0);
  const [value, setValue] = useState(
    faqInquiry?.search?.noticeContent
      ? faqInquiry?.search?.noticeContent
      : "ALL"
  );
  const [searchType, setSearchType] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  /** APOLLO REQUESTS **/
  const [createNoticeByAdmin] = useMutation(CREATE_NOTICE_BY_ADMIN);
  const [updateNoticeByAdmin] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const [deleteNoticeByAdmin] = useMutation(DELETE_NOTICE_BY_ADMIN);

  const {
    loading: getAllFaqsByAdminLoading,
    data: getAllFaqsByAdminData,
    error: getAllFaqsByAdminError,
    refetch: getAllFaqsByAdminRefetch,
  } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: faqInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      const allNotices = data?.getNoticesForAdmin?.list || [];
      const filteredNotices = allNotices.filter(
        (n: any) =>
          n.noticeCategory === NoticeCategory.TERMS ||
          n.noticeCategory === NoticeCategory.INQUIRY
      );
      setNotices(filteredNotices);
      setFaqTotal(filteredNotices.length);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllFaqsByAdminRefetch({ input: faqInquiry });
  }, [faqInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    faqInquiry.page = newPage + 1;
    await getAllFaqsByAdminRefetch({ input: faqInquiry });
    setFaqInquiry({ ...faqInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    faqInquiry.limit = parseInt(event.target.value, 10);
    faqInquiry.page = 1;
    await getAllFaqsByAdminRefetch({ input: faqInquiry });
    setFaqInquiry({ ...faqInquiry });
  };

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const handleTabChange = async (event: any, newValue: string) => {
    setValue(newValue);

    setFaqInquiry({
      ...faqInquiry,
      page: 1,
      sort: "createdAt",
    });

    switch (newValue) {
      case "ACTIVE":
        setFaqInquiry({
          ...faqInquiry,
          search: { noticeStatus: [NoticeStatus.ACTIVE] },
        });
        break;
      case "DELETE":
        setFaqInquiry({
          ...faqInquiry,
          search: { noticeStatus: [NoticeStatus.DELETE] },
        });
        break;
      case "HOLD":
        setFaqInquiry({
          ...faqInquiry,
          search: { noticeStatus: [NoticeStatus.HOLD] },
        });
        break;

      default:
        delete faqInquiry?.search?.noticeStatus;
        setFaqInquiry({ ...faqInquiry });
        break;
    }
  };

  const searchTypeHandler = async (newValue: string) => {
    try {
      setSearchType(newValue);

      if (newValue !== "ALL") {
        setFaqInquiry({
          ...faqInquiry,
          page: 1,
          sort: "createdAt",
          search: {
            ...faqInquiry.search,
            noticeCategory: [newValue as NoticeCategory],
          },
        });
      } else {
        delete faqInquiry?.search?.noticeCategory;
        setFaqInquiry({ ...faqInquiry });
      }
    } catch (err: any) {
      console.log("searchTypeHandler: ", err.message);
    }
  };

  const searchTextHandler = () => {
    try {
      setFaqInquiry({
        ...faqInquiry,
        search: {
          ...faqInquiry.search,
          noticeTitle: searchText,
        },
      });
    } catch (err: any) {
      console.log("searchTextHandler: ", err.message);
    }
  };

  const removeFaqHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to remove?")) {
        await deleteNoticeByAdmin({
          variables: { input: id },
        });
      }
      menuIconCloseHandler();
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const updateFaqHandler = async (updateData: NoticeUpdate) => {
    try {
      console.log("+updateData: ", updateData);
      await updateNoticeByAdmin({
        variables: {
          input: updateData,
        },
      });
      menuIconCloseHandler();
      await getAllFaqsByAdminRefetch({ input: faqInquiry });
    } catch (err: any) {
      menuIconCloseHandler();
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

  const [open, setOpen] = useState(false);
  const [noticeData, setNoticeData] = useState({
    noticeCategory: NoticeCategory.FAQ,
    noticeTitle: "",
    noticeContent: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field: string, value: string) => {
    setNoticeData({ ...noticeData, [field]: value });
  };

  const createNoticeHandler = async () => {
    try {
      if (!noticeData.noticeTitle.trim() || !noticeData.noticeContent.trim()) {
        await sweetConfirmAlert("Title and Content cannot be empty!");
        return;
      }

      await createNoticeByAdmin({
        variables: { input: noticeData },
      });

      handleClose();
      await sweetTopSuccessAlert("Notice created successfully!");
      await getAllFaqsByAdminRefetch({ input: faqInquiry });
      setNoticeData({
        noticeCategory: NoticeCategory.FAQ,
        noticeTitle: "",
        noticeContent: "",
      });
    } catch (err: any) {
      sweetErrorHandling(err);
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Box component={"div"} className={"title flex_space"}>
        <Typography variant={"h2"}>1:1 Inquiry</Typography>
        <Button
          className="btn_add"
          variant={"contained"}
          size={"medium"}
          sx={{
            bgcolor: "green",
            color: "#fff",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
          onClick={handleOpen}
        >
          <AddRoundedIcon sx={{ mr: "8px", color: "#fff" }} />
          ADD
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}>
              Create New Notice
            </Typography>

            <Select
              fullWidth
              value={noticeData.noticeCategory}
              onChange={(e) => handleChange("noticeCategory", e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value={NoticeCategory.TERMS}>
                {NoticeCategory.TERMS}
              </MenuItem>
              <MenuItem value={NoticeCategory.INQUIRY}>
                {NoticeCategory.INQUIRY}
              </MenuItem>
            </Select>

            <TextField
              fullWidth
              label="Title"
              value={noticeData.noticeTitle}
              onChange={(e) => handleChange("noticeTitle", e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Content"
              multiline
              value={noticeData.noticeContent}
              onChange={(e) => handleChange("noticeContent", e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "green",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "green",
                  },
                }}
                onClick={createNoticeHandler}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={"value"}>
            <Box component={"div"}>
              <List className={"tab-menu"}>
                <ListItem
                  onClick={(e) => handleTabChange(e, "ALL")}
                  value="ALL"
                  className={value === "ALL" ? "li on" : "li"}
                >
                  All
                </ListItem>
                <ListItem
                  onClick={(e) => handleTabChange(e, "ACTIVE")}
                  value="ACTIVE"
                  className={value === "ACTIVE" ? "li on" : "li"}
                >
                  ACTIVE
                </ListItem>
                <ListItem
                  onClick={(e) => handleTabChange(e, "HOLD")}
                  value="HOLD"
                  className={value === "HOLD" ? "li on" : "li"}
                >
                  HOLD
                </ListItem>
                <ListItem
                  onClick={(e) => handleTabChange(e, "DELETE")}
                  value="DELETE"
                  className={value === "DELETE" ? "li on" : "li"}
                >
                  DELETE
                </ListItem>
              </List>
              <Divider />
              <Stack className={"search-area"} sx={{ m: "24px" }}>
                <Select sx={{ width: "160px", mr: "20px" }} value={searchType}>
                  <MenuItem
                    value={"ALL"}
                    onClick={() => searchTypeHandler("ALL")}
                  >
                    ALL
                  </MenuItem>
                  {Object.values(NoticeCategory).map((category: string) => (
                    <MenuItem
                      value={category}
                      onClick={() => searchTypeHandler(category)}
                      key={category}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>

                <OutlinedInput
                  value={searchText}
                  onChange={(e: any) => textHandler(e.target.value)}
                  sx={{ width: "100%" }}
                  className={"search"}
                  placeholder="Search user name"
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
                            setFaqInquiry({
                              ...faqInquiry,
                              search: {
                                ...faqInquiry.search,
                                noticeTitle: "",
                              },
                            });
                            await getAllFaqsByAdminRefetch({
                              input: faqInquiry,
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
              </Stack>
              <Divider />
            </Box>
            <InquiryList
              notices={notices.filter(
                (n) =>
                  n.noticeCategory === NoticeCategory.TERMS ||
                  n.noticeCategory === NoticeCategory.INQUIRY
              )}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updateFaqHandler={updateFaqHandler}
              removeFaqHandler={removeFaqHandler}
            />

            <TablePagination
              rowsPerPageOptions={[20, 40, 60]}
              component="div"
              count={faqTotal}
              rowsPerPage={faqInquiry?.limit}
              page={faqInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(FaqArticles);
