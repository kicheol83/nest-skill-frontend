import React, { useEffect, useState } from "react";
import {
  Badge,
  IconButton,
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { getSocket } from "@/libs/config";
import { useReactiveVar, useQuery, useMutation } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { Notification } from "@/libs/types/notification/notification";
import { GET_NOTIFICATIONS } from "@/apollo/user/query";
import { MARK_ALL_READ, MARK_NOTIFICAION_READ } from "@/apollo/user/mutation";
import { useRouter } from "next/router";
import moment from "moment";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export const NotificationBell = ({ initialInput, ...props }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );
  const [markNotificationRead] = useMutation(MARK_NOTIFICAION_READ);

  const { data, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: { input: searchFilter },
    skip: !user?._id,
    fetchPolicy: "network-only",
  });

  const [markAllRead] = useMutation(MARK_ALL_READ, {
    variables: { input: user?._id },
  });

  useEffect(() => {
    if (data?.getNotifications) {
      setNotifications(data.getNotifications.list || []);
      setTotalCount(data.getNotifications.metaCounter[0]?.total || 0);
    }
  }, [data]);

  useEffect(() => {
    if (!user?._id) return;
    const socket = getSocket(user._id);

    socket.on("notification", (notif: Notification) => {
      setNotifications((prev) => [notif, ...prev]);
      setTotalCount((prev) => prev + 1);
    });

    return () => {
      socket.off("notification");
    };
  }, [user?._id]);

  const dismissNotification = async (index: number) => {
    const notif = notifications[index];
    if (!notif.isRead) {
      try {
        await markNotificationRead({
          variables: { input: notif._id },
        });
      } catch (err) {
        console.error("Mark notification read error:", err);
        return;
      }
    }
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    setTotalCount((prev) => prev - 1);
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setTotalCount(0);
      await refetch();
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{ color: "#1976d2" }}
      >
        <Badge
          badgeContent={notifications.filter((n) => !n.isRead).length}
          color="error"
        >
          <NotificationsIcon sx={{ color: "#fff", fontSize: "25px" }} />
        </Badge>
      </IconButton>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: 50,
            right: 0,
            width: 360,
            maxHeight: 450,
            overflowY: "auto",
            borderRadius: 2,
            p: 2,
            bgcolor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            mb={1}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              fontFamily={"Space Grotesk"}
            >
              Notifications
            </Typography>
            {notifications.length > 0 && (
              <Button size="small" onClick={handleMarkAllRead}>
                <DoneAllIcon sx={{ color: "blue" }} />
              </Button>
            )}
          </Box>
          <Divider sx={{ mb: 1 }} />

          {notifications.length === 0 && (
            <Typography
              display={"flex"}
              justifyContent={"center"}
              variant="body2"
              color="text.secondary"
              mt={2}
            >
              <NotificationsOffIcon /> No new notifications
            </Typography>
          )}

          <Stack spacing={1}>
            {notifications.map((notif, i) => (
              <Box
                key={i}
                sx={{
                  p: 1,
                  bgcolor: notif.isRead ? "#f5f5f5" : "#e3f2fd",
                  borderRadius: 1,
                  position: "relative",
                  transition: "background 0.3s",
                  "&:hover": { bgcolor: "#d0e7ff" },
                }}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 2, right: 2 }}
                  onClick={() => dismissNotification(i)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}
                      src={notif.memberData?.memberImage || undefined}
                    >
                      {!notif.memberData?.memberImage &&
                        notif.notificationTitle.charAt(0)}
                    </Avatar>
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mb: 0.2 }}
                    >
                      {notif.notificationTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notif.notificationDesc}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {moment(notif.createdAt).fromNow()}{" "}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

NotificationBell.defaultProps = {
  initialInput: {
    page: 1,
    limit: 30,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};
