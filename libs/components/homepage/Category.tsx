import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const Category = () => {
  const device = useDeviceDetect();
  const [category, setCategory] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

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
              {category.map((category, index) => (
                <CategoryCard key={index} />
              ))}
            </Box>
          </Box>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              count={10}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1.2rem",
                  width: "48px",
                  height: "48px",
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
