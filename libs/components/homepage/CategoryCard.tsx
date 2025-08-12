import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { ProviderType } from "@/libs/enums/provider.enum";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

interface HeaderFilterProps {
  initialInput: ProviderJobsInquiry;
}

const CategoryCard = (props: HeaderFilterProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [searchFilter, setSearchFilter] =
    useState<ProviderJobsInquiry>(initialInput);

  /** HANDLERS **/
  const typeSelectHandler = useCallback(
    async (type: ProviderType) => {
      try {
        const updatedFilter = {
          ...searchFilter,
          search: {
            ...searchFilter.search,
            typeList: [type],
          },
        };
        setSearchFilter(updatedFilter);

        await router.push(
          `/service?input=${JSON.stringify(updatedFilter)}`,
          `/service?input=${JSON.stringify(updatedFilter)}`
        );
      } catch (err) {
        console.log("ERROR, typeSelectHandler:", err);
      }
    },
    [searchFilter, router]
  );

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack
        display={"flex"}
        gap={"17px"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        flexDirection={"row"}
      >
        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/carpet1.svg" alt="" />
          <span className="text-top">FURNITURE SERVICE</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.FURNITURE)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img
            className="box-icon"
            src="/icons/categorys/painter1.svg"
            alt=""
          />
          <span className="text-top">PAINTER SERVICE</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.PAINTING)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/repaies.svg" alt="" />
          <span className="text-top">HOME REPAIRS</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.REPAIRS)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img
            className="box-icon"
            src="/icons/categorys/electrical.svg"
            alt=""
          />
          <span className="text-top">ELECTRICIAN SERVICE</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.ELECTRICIAN)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img className="box-icon" src="/icons/categorys/gutter1.svg" alt="" />
          <span className="text-top">GUTTER CLEANING</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.GUTTER)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img
            className="box-icon"
            src="/icons/categorys/plumbing.svg"
            alt=""
          />
          <span className="text-top">PLUMBING SERVICE</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.PLUMBING)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img
            className="box-icon"
            src="/icons/categorys/house-siding.svg"
            alt=""
          />
          <span className="text-top">HOUSE SIDING</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.SIDING)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>

        <Box className="category-box">
          <img
            className="box-icon"
            src="/icons/categorys/carpentry.svg"
            alt=""
          />
          <span className="text-top">CARPENTRY SERVICE</span>
          <span
            className="text-center"
            onClick={() => typeSelectHandler(ProviderType.CARPENTRY)}
          >
            lean more
            <img src="/icons/category/arrow-left.svg" alt="" />
          </span>
        </Box>
      </Stack>
    );
  }
};

CategoryCard.defaultProps = {
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

export default CategoryCard;
