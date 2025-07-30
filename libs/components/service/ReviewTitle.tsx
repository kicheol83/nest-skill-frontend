import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";

const ReviewTitle = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>ReviewTitle</div>;
  } else {
    return (
      <Stack className="filter-frame">
        <Stack className="container"></Stack>
      </Stack>
    );
  }
};

export default ReviewTitle;
