import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Button, Stack } from "@mui/material";

const Afisha = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>AFISHA</div>;
  } else {
    return (
      <Stack className="afisha">
        <Stack className="container">
          <Stack className="afisha-frame">
            <Box className="afisha-title">
              <span className="bold-text">Start posting jobs today</span>
              <span className="title-center">
                Start posting jobs for only $10
              </span>
              <Button className="button">Sign Up For Free</Button>
              <img src="/img/banner/dashboard.png" alt="" />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default Afisha;
