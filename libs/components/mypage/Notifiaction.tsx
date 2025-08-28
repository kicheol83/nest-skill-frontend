import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { userVar } from "@/apollo/store";
import { GET_NOTIFICATIONS } from "@/apollo/user/query";
import {
  DELETE_NOTIFICATION,
  MARK_ALL_READ,
  MARK_NOTIFICAION_READ,
  UPDATE_NOTIFICATION,
} from "@/apollo/user/mutation";
import { Notification } from "@/libs/types/notification/notification";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import moment from "moment";

export default function NotificationPanel({ initialInput, ...props }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [searchFilter, setSearchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );

  const [markNotificationRead] = useMutation(MARK_NOTIFICAION_READ);
  const [markAllRead] = useMutation(MARK_ALL_READ, {
    variables: { input: user?._id },
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

  const { data, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: { input: searchFilter },
    skip: !user?._id,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getNotifications) {
      setNotifications(data.getNotifications.list || []);
      setTotalCount(data.getNotifications.metaCounter[0]?.total || 0);
    }
  }, [data]);

  // 🔹 Filter tugmasi bosilganda
  const handleFilter = (type?: string) => {
    const newFilter = {
      ...searchFilter,
      search: type ? { notificationType: type } : {}, // type berilsa filter bo‘ladi
      page: 1,
    };
    setSearchFilter(newFilter);
    refetch({ input: newFilter });
  };

  return (
    <div className="notification-panel">
      <div className="header">
        <h2>
          My Notifications <span>({totalCount})</span>
        </h2>
      </div>

      {/* Filter buttons */}
      <div className="filters">
        <div className="left">
          <Button
            variant={
              !searchFilter.search?.notificationType ? "contained" : "outlined"
            }
            className={`chip ${
              !searchFilter.search?.notificationType ? "active" : ""
            }`}
            onClick={() => handleFilter()}
          >
            All
          </Button>
          <Button
            variant={
              searchFilter.search?.notificationType === "ARTICLE"
                ? "contained"
                : "outlined"
            }
            className="chip"
            onClick={() => handleFilter("ARTICLE")}
          >
            Article
          </Button>
          <Button
            variant={
              searchFilter.search?.notificationType === "ORDER"
                ? "contained"
                : "outlined"
            }
            className="chip"
            onClick={() => handleFilter("ORDER")}
          >
            Order
          </Button>
          <Button
            variant={
              searchFilter.search?.notificationType === "PAYMENT"
                ? "contained"
                : "outlined"
            }
            className="chip"
            onClick={() => handleFilter("PAYMENT")}
          >
            Payment
          </Button>
          <Button
            variant={
              searchFilter.search?.notificationType === "REVIEW"
                ? "contained"
                : "outlined"
            }
            className="chip"
            onClick={() => handleFilter("REVIEW")}
          >
            Review
          </Button>
        </div>

        <div className="right">
          <button
            className="action danger"
            onClick={async () => {
              await markAllRead();
              refetch({ input: searchFilter });
            }}
          >
            Read all
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="notif-list">
        {notifications.length > 0 ? (
          notifications.map((notif: any) => (
            <Card
              key={notif._id}
              className={`notif-item ${notif.isRead ? "read" : "unread"}`}
              variant="outlined"
            >
              <CardContent className="notif-content">
                <Box className="notif-header">
                  <NotificationsActiveIcon className="notif-icon" />
                  <Typography variant="h6" className="notif-title">
                    {notif.notificationTitle}
                  </Typography>
                </Box>
                <Typography variant="body2" className="notif-desc">
                  {notif.notificationDesc}
                </Typography>
                <Typography variant="caption" className="notif-time">
                  {moment(notif.createdAt).fromNow()} {/* 1 soat oldin */}
                </Typography>
              </CardContent>
              <Box className="notif-actions">
                {!notif.isRead && (
                  <IconButton
                    color="success"
                    onClick={async () => {
                      await markNotificationRead({
                        variables: { input: notif._id },
                      });
                      refetch({ input: searchFilter });
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}
                <IconButton
                  color="error"
                  onClick={async () => {
                    await deleteNotification({
                      variables: { input: notif._id },
                    });
                    refetch({ input: searchFilter });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))
        ) : (
          <div className="empty">
            <div className="icon">🔔</div>
            <p>There are no new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}

NotificationPanel.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};
