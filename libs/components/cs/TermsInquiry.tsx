import React, { useState } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { AccordionDetails, Box, Stack, Typography } from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useQuery } from "@apollo/client";
import { GET_NOTICES_BY_ADMIN } from "@/apollo/admin/query";
import { T } from "@/libs/types/common";
import { Notice } from "@/libs/types/notice/notice";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "1.4rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#fff",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const TermsInquiry = () => {
  const device = useDeviceDetect();
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchNotice, setSearchNotice] = useState<T>({
    page: 1,
    limit: 20,
    search: {},
  });

  /** APOLLO REQUESTS **/
  const { data } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: searchNotice },
    onCompleted: (data: T) => {
      console.log("Full data from backend:", data);

      const allNotices = data?.getNoticesForAdmin?.list || [];
      console.log("allNotices length:", allNotices.length);
      console.log(
        "TERMS only:",
        allNotices.filter((n: any) => n.noticeCategory === "TERMS").length
      );
      console.log(
        "INQUIRY only:",
        allNotices.filter((n: any) => n.noticeCategory === "INQUIRY").length
      );
      console.log(
        "FAQ only:",
        allNotices.filter((n: any) => n.noticeCategory === "FAQ").length
      );

      setNotices(allNotices);

      const openPanels = allNotices
        .filter(
          (n: any) =>
            n.noticeCategory === "TERMS" || n.noticeCategory === "INQUIRY"
        )
        .map((n: any) => n._id);

      setExpandedPanels(openPanels);
    },
  });

  const togglePanel = (id: string) => {
    setExpandedPanels((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  if (device === "mobile") return <div>Terms & Inquiry MOBILE</div>;

  return (
    <Stack className="faq-content">
      <Box className="wrap">
        {notices
          .filter(
            (notice: Notice) =>
              notice.noticeCategory === "TERMS" ||
              notice.noticeCategory === "INQUIRY"
          )
          .map((notice: Notice) => {
            const isExpanded = expandedPanels.includes(notice._id);
            return (
              <Accordion
                key={notice._id}
                expanded={isExpanded}
                onChange={() => togglePanel(notice._id)}
              >
                <AccordionSummary
                  expandIcon={
                    <KeyboardArrowDownRoundedIcon
                      sx={{
                        fontSize: "1.4rem",
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  }
                  aria-controls={`panel-${notice._id}-content`}
                  id={`panel-${notice._id}-header`}
                  sx={{
                    backgroundColor: "#f7f7f7",
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Typography
                    className="badge"
                    variant="h5"
                    sx={{ marginRight: "1rem", color: "#1976d2" }}
                  >
                    <StickyNote2Icon />
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Space Grotesk", fontWeight: 500 }}
                  >
                    {notice.noticeContent}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#fafafa", padding: "0.5rem 2rem" }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <AutoFixHighIcon sx={{ color: "#181a20" }} />
                    <Typography sx={{ fontFamily: "Space Grotesk" }}>
                      {notice.noticeTitle}
                    </Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Box>
    </Stack>
  );
};

export default TermsInquiry;
