import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Stack } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useRouter } from "next/router";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { useState } from "react";

interface HeaderFilterProps {
  initialInput: ProviderJobsInquiry;
}

const Category = (props: HeaderFilterProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [searchFilter, setSearchFilter] =
    useState<ProviderJobsInquiry>(initialInput);

  /** HANDLERS **/
  const pushShowAllHandlers = async () => {
    await router.push(
      `/service?input=${JSON.stringify(searchFilter)}`,
      `/service?input=${JSON.stringify(searchFilter)}`
    );
  };

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
              <span onClick={() => pushShowAllHandlers()}>Show all jobs </span>
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

Category.defaultProps = {
  initialInput: {
    page: 1,
    limit: 7,
    search: {
      workTimeRange: {
        start: "06:00",
        end: "18:00",
      },
      workPrice: {
        start: 0,
        end: 500,
      },
    },
  },
};

export default Category;
