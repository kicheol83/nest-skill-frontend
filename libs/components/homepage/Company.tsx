import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";

const Company = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>EVENT CARD</div>;
  } else {
    return (
      <Stack className="company">
        <Stack className="container">
          <Box className="company-name">
            <span>Companies we helped grow</span>
          </Box>
          <Box className="company-logo">
            <img src="/icons/service/VADAFONE.svg" alt="" />
            <img className="logo" src="/icons/service/INTEL.svg" alt="" />
            <img className="logo" src="/icons/service/TESLA.svg" alt="" />
            <img className="logo" src="/icons/service/AMD.svg" alt="" />
            <img className="logo" src="/icons/service/TALKIT.svg" alt="" />
          </Box>
        </Stack>
      </Stack>
    );
  }
};

export default Company;
