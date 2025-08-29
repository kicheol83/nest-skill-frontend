import React, { SyntheticEvent, useState } from "react";
import { Stack, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { T } from "@/libs/types/common";
import { Notice } from "@/libs/types/notice/notice";
import { GET_NOTICES_BY_ADMIN } from "@/apollo/admin/query";
import { useQuery } from "@apollo/client";
import Moment from "react-moment";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

const NoticeList = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchNotice, setSearchNotice] = useState<T>({
    page: 1,
    limit: 20,
    search: {},
  });

  /** APOLLO REQUESTS **/
  const {
    loading: getNoticeLoading,
    data: getNoticeData,
    error: geNoticeError,
    refetch: getNoticeRefetch,
  } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: searchNotice },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setNotices(data.getNoticesForAdmin?.list);
    },
  });

  if (device === "mobile") {
    return <div>NOTICE MOBILE</div>;
  } else {
    return (
      <Stack className={"notice-content"}>
        <span className={"title"}>Notice</span>
        <Stack className={"main"}>
          <Box component={"div"} className={"top"}>
            <span>number</span>
            <span>title</span>
            <span>date</span>
          </Box>
          <Stack className={"bottom"}>
            {notices
              .filter((notice: Notice) => notice.noticeCategory === "NOTICE")
              .map((notice: Notice, index: number) => {
                const isFirst = index === 0; // birinchi element
                const no = index + 1; // tartib raqami

                return (
                  <div
                    key={notice.noticeTitle}
                    className={`notice-card ${isFirst ? "event" : ""}`}
                  >
                    {isFirst ? (
                      <TurnedInIcon sx={{ color: "#007aff" }} />
                    ) : (
                      <span className="notice-number">{no}</span>
                    )}
                    <span className="notice-title">{notice.noticeTitle}</span>
                    <span className="notice-date">
                      <Moment format="DD.MM.YY HH:mm">
                        {notice.createdAt}
                      </Moment>
                    </span>
                  </div>
                );
              })}
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default NoticeList;
