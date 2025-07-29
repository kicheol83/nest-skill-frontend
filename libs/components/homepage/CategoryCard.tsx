import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";

const CategoryCard = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack display={"flex"} gap={"17px"} justifyContent={"space-between"} flexWrap={"wrap"} flexDirection={"row"}>
        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/carpet1.svg" alt="" />
          <span className="text-top">FURNITURE SERVICE</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/painter1.svg" alt="" />
          <span className="text-top">PAINTER SERVICE</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>{" "}
        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/repaies.svg" alt="" />
          <span className="text-top">HOME REPAIRS</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/electrical.svg" alt="" />
          <span className="text-top">ELECTRICAN SERVICE</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
         <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/gutter1.svg" alt="" />
          <span className="text-top">GUTTER CLEANING</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
         <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/plumbing.svg" alt="" />
          <span className="text-top">PLUMBING SERVICE</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
         <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/house-siding.svg" alt="" />
          <span className="text-top">HOUSE SIDING</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
         <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/carpentry.svg" alt="" />
          <span className="text-top">CARPENTRY SERVICE</span>
          <span className="text-center">
            235 jobs available
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
      </Stack>
    );
  }
};

export default CategoryCard;
