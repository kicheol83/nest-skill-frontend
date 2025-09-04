import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  Box,
  Checkbox,
  Modal,
  FormControl,
  Select,
  TextField,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { NotePencil } from "phosphor-react";
import Moment from "react-moment";

import { Notice } from "@/libs/types/notice/notice";
import { NoticeUpdate } from "@/libs/types/notice/notice.update";
import { NoticeCategory, NoticeStatus } from "@/libs/enums/notice.enum";
import { REACT_APP_API_URL } from "@/libs/config";

interface NoticeListProps {
  notices: Notice[];
  removeFaqHandler: any;
  updateFaqHandler?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const NoticeList: React.FC<NoticeListProps> = ({
  notices,
  removeFaqHandler,
  updateFaqHandler,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeUpdate | null>(
    null
  );

  /** LIFECYCLES **/

  useEffect(() => {
    if (selectedNotice) {
      const { _id, noticeCategory, noticeStatus, noticeTitle, noticeContent } =
        selectedNotice;
      setForm({
        _id,
        noticeCategory,
        noticeStatus,
        noticeTitle,
        noticeContent,
      });
    }
  }, [selectedNotice]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** HANDLERS **/

  const handleOpen = (notice: NoticeUpdate) => {
    setSelectedNotice(notice);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [form, setForm] = useState<NoticeUpdate>({
    _id: "",
    noticeCategory: NoticeCategory.FAQ,
    noticeStatus: NoticeStatus.HOLD,
    noticeTitle: "",
    noticeContent: "",
  });

  const handleSubmit = () => {
    if (!form._id) return;

    const { _id, noticeCategory, noticeStatus, noticeTitle, noticeContent } =
      form;
    const cleanedData: NoticeUpdate = {
      _id,
      noticeCategory,
      noticeStatus,
      noticeTitle,
      noticeContent,
    };

    updateFaqHandler(cleanedData);
    handleClose();
  };

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>WRITER</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => {
              const member_image = notice.memberData?.memberImage
                ? `${REACT_APP_API_URL}/${notice.memberData?.memberImage}`
                : "/img/profile/defaultUser.svg";

              return (
                <TableRow hover key={notice._id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>{notice.noticeCategory}</TableCell>
                  <TableCell>{notice.noticeTitle}</TableCell>
                  <TableCell>{notice._id}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Link
                        href={`/_admin/users/detail?mb_id=${notice.memberData?._id}`}
                      >
                        <Avatar
                          src={member_image}
                          sx={{ width: 32, height: 32 }}
                        />
                      </Link>
                      <Link
                        href={`/_admin/users/detail?mb_id=${notice.memberData?._id}`}
                      >
                        <Typography>{notice.memberData?.memberNick}</Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Moment format="DD.MM.YY HH:mm">{notice.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="delete">
                      <IconButton onClick={() => removeFaqHandler(notice._id)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="edit">
                      <IconButton onClick={() => handleOpen(notice)}>
                        <NotePencil size={24} weight="fill" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Update Notice
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Select
                name="noticeCategory"
                value={form.noticeCategory}
                onChange={handleChange}
              >
                {Object.values(NoticeCategory).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                name="noticeStatus"
                value={form.noticeStatus}
                onChange={handleChange}
              >
                {Object.values(NoticeStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Title"
              name="noticeTitle"
              fullWidth
              value={form.noticeTitle}
              onChange={handleChange}
            />
            <TextField
              label="Content"
              name="noticeContent"
              fullWidth
              multiline
              value={form.noticeContent}
              onChange={handleChange}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "green",
                  color: "#fff",
                  "&:hover": { backgroundColor: "green" },
                }}
                onClick={() => updateFaqHandler(form)}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
