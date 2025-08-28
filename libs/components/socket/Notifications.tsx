import React, { useEffect, useState } from "react";
import {
  Badge,
  IconButton,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { getSocket } from "@/libs/config";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { Notification } from "@/libs/types/notification/notification";

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const user = useReactiveVar(userVar);

  useEffect(() => {
    if (!user?._id) return;
    const socket = getSocket(user._id);

    socket.on("notification", (notif: Notification) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const dismissNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ top: 20, zIndex: 9999 }}>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{ color: "#1976d2" }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>

      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "50px",
            right: 0,
            width: 300,
            maxHeight: 400,
            overflowY: "auto",
            borderRadius: 2,
            p: 1,
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          {notifications.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          )}
          {notifications.map((notif, i) => (
            <Box
              key={i}
              sx={{
                mb: 1,
                p: 1,
                bgcolor: "#f5f5f5",
                borderRadius: 1,
                position: "relative",
              }}
            >
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 2, right: 2 }}
                onClick={() => dismissNotification(i)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="subtitle2" fontWeight="bold">
                {notif.notificationTitle}
              </Typography>
              <Typography variant="body2">{notif.notificationDesc}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};
