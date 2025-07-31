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
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              count={10}
              variant="outlined"
              shape="circular"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                  width: "38px",
                  height: "38px",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default Category;
