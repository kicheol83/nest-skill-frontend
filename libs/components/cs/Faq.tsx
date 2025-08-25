import React, { SyntheticEvent, useState } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { AccordionDetails, Box, Stack, Typography } from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useQuery } from "@apollo/client";
import { GET_NOTICES_BY_ADMIN } from "@/apollo/admin/query";
import { T } from "@/libs/types/common";
import { Notice, Notices } from "@/libs/types/notice/notice";

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

const Faq = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [category, setCategory] = useState<string>("property");
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchNotice, setSearchNotice] = useState<T>({
    page: 1,
    limit: 20,
    search: {},
  });

  /** APOLLO REQUESTS **/
  const {
    loading: getFaqLoading,
    data: getFaqData,
    error: geFaqError,
    refetch: getFaqRefetch,
  } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: "network-only",
    variables: { input: searchNotice },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setNotices(data.getNoticesForAdmin?.list);
    },
  });

  /** LIFECYCLES **/

  /** HANDLERS **/
  const changeCategoryHandler = (category: string) => {
    setCategory(category);
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (device === "mobile") {
    return <div>FAQ MOBILE</div>;
  } else {
    return (
      <Stack className={"faq-content"}>
        <Box className={"wrap"} component={"div"}>
          {notices &&
            notices
              .filter((notice: Notice) => notice.noticeCategory === "FAQ")
              .map((notice: Notice) => (
                <Accordion
                  expanded={expanded === notice?._id}
                  onChange={handleChange(notice?._id)}
                  key={notice?._id}
                >
                  <AccordionSummary
                    id="panel1d-header"
                    className="question"
                    aria-controls="panel1d-content"
                  >
                    <Typography className="badge" variant={"h4"}>
                      Q
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Space Grotesk",
                      }}
                    >
                      {notice.noticeContent}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack className={"answer flex-box"}>
                      <Typography
                        className="badge"
                        variant={"h4"}
                        color={"primary"}
                      >
                        A
                      </Typography>
                      <Typography sx={{ fontFamily: "Space Grotesk" }}>
                        {notice?.noticeTitle}
                      </Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
        </Box>
      </Stack>
    );
  }
};

export default Faq;
