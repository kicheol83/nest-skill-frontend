import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const Category = () => {
  const device = useDeviceDetect();
  const [category, setCategory] = useState<number[]>([]);

  if (device === "mobile") {
    return <div>CATEGORY</div>;
  } else {
    return (
      <Stack className="category">
        <Stack className="container">
          <Box className="category-title">
            <span>
              Explore by<span className="category-txt">category</span>{" "}
            </span>
            <Box className="show-all">
              <span>Show all jobs </span>
              <img src="/icons/Stroke.svg" alt="" />
            </Box>
          </Box>
          <Box className="category-card">
            <Box className="category-frame">
              <CategoryCard />
            </Box>
          </Box>
        </Stack>
      </Stack>
    );
  }
};

export default Category;
