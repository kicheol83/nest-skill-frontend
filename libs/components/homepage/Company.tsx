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
            <img src="/icons/service/VADAFONE.SVG" alt="" />
            <img className="logo" src="/icons/service/INTEL.SVG" alt="" />
            <img className="logo" src="/icons/service/TESLA.SVG" alt="" />
            <img className="logo" src="/icons/service/AMD.SVG" alt="" />
            <img className="logo" src="/icons/service/TALKIT.SVG" alt="" />
          </Box>
        </Stack>
      </Stack>
    );
  }
};

export default Company;
