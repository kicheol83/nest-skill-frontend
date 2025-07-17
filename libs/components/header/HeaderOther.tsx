import { Stack, Box, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const HeaderOther = () => {
  return (
    <>
      <Stack className="header-other-frame">
        <Stack className="container">
          <Stack className="job-apply-frame">
            <img className="job-svg" src="/img/job/job-apply.svg" alt="" />
            <Box className="job-title">
              <span className="sc-txt">Social Media Assistant</span>
              <span className="location-txt">
                Stripe | Paris, France | Full Time
              </span>
            </Box>
            <Box className="icon-button">
              <ShareOutlinedIcon className="share-icon" />
              <div></div>
              <Button className="aplly-button">Apply</Button>
            </Box>
          </Stack>
          <span className="router">Home/Service/Detail</span>
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderOther;
