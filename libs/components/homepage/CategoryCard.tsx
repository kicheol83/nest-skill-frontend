import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";

const CategoryCard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Box className="category-box">
        <ChildFriendlyOutlinedIcon className="box-icon" />
        <span className="text-top">BABYSITTING</span>
        <span className="text-center">
          235 jobs available
          <img src="/icons/category/arrow-left.svg" alt="" />
        </span>
      </Box>
    );
  }
};

export default CategoryCard;
