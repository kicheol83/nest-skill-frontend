import { Stack, Box, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const HeaderOther = () => {
  return (
    <>
      <Stack className="header-other-frame">
        <Stack className="container">
          <Stack className="job-apply-frame">
            <img
              style={{ width: "88px", height: "88px" }}
              className="job-svg"
              src="/img/profile/men.webp"
              alt=""
            />
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
          <img className="rec1" src="/img/rectangle/rec1.svg" alt="" />
          <img className="rec2" src="/img/rectangle/rec2.svg" alt="" />
          <img className="rec3" src="/img/rectangle/rec3.svg" alt="" />
          <img className="rec4" src="/rectangle/rec4.svg" alt="" />
          <img className="rec5" src="/img/rectangle/rec1.svg" alt="" />
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderOther;
