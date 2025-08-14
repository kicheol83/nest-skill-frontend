import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ProviderLocation } from "@/libs/enums/provider.enum";

interface HeaderFilterProps {
  initialInput: ProviderJobsInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
  const { initialInput } = props;
  const [searchFilter, setSearchFilter] =
    useState<ProviderJobsInquiry>(initialInput);
  const searchTextRef: any = useRef;
  const locationRef: any = useRef;
  const router = useRouter();
  const [writeText, setWriteText] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openSearchJob, setOpenSearchJob] = useState(false);
  const [providerLocation, setProviderLocation] = useState<ProviderLocation[]>(
    Object.values(ProviderLocation)
  );

  /** LIFECYCLES **/
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!locationRef?.current?.contains(event.target)) {
        setOpenLocation(false);
      }
      if (!searchTextRef?.current?.contains(event.target)) {
        setWriteText(false);
      }
    };
    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  /** HANDLERS **/
  const searchButtonHandler = (status: boolean) => {
    setWriteText(false);
    setOpenLocation(false);
    setOpenSearchJob(status);
  };

  const locationStateChangeHandler = () => {
    setOpenLocation((prev) => !prev);
    setWriteText(false);
  };

  const propertyLocationSelectHandler = useCallback(
    async (value: any) => {
      try {
        setSearchFilter({
          ...searchFilter,
          search: {
            ...searchFilter.search,
            locationList: [value],
          },
        });
        locationStateChangeHandler();
      } catch (err: any) {
        console.log("ERROR, propertyLocationSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const pushSearchHandler = async () => {
    try {
      if (searchFilter?.search?.locationList?.length == 0) {
        delete searchFilter.search.locationList;
      }

      await router.push(
        `/service?input=${JSON.stringify(searchFilter)}`,
        `/service?input=${JSON.stringify(searchFilter)}`
      );
    } catch (err: any) {
      console.log("ERROR, pushSearchHandler:", err);
    }
  };
  return (
    <>
      <Stack className="job-search-bar">
        <Box className="search-fields">
          <TextField
            value={searchFilter?.search?.text ?? ""}
            sx={{
              height: "56px",

              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black", // default border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007aff",
                },
              },
            }}
            placeholder="Job title or keyword"
            variant="outlined"
            className="search-input"
            onChange={(e: any) => {
              setSearchFilter({
                ...searchFilter,
                search: { ...searchFilter.search, text: e.target.value },
              });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Select
            sx={{
              height: "56px",
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black", // default border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007aff",
                },
              },
            }}
            defaultValue="Location"
            className="location-select"
            displayEmpty
            startAdornment={<RoomOutlinedIcon className="location-icon" />}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#999" }}>Location</span>; // Placeholder text
              }
              return selected;
            }}
          >
            {providerLocation.map((location: string) => {
              return (
                <MenuItem
                  onClick={() => propertyLocationSelectHandler(location)}
                  key={location}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#67a0f5a9",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#d0e7ff",
                    },
                  }}
                  value={location}
                >
                  {location}
                </MenuItem>
              );
            })}
          </Select>

          <Button
            className="search-button"
            variant="contained"
            sx={{
              height: "56px",
              px: 3,
              paddingX: "20px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
            }}
            onClick={pushSearchHandler}
          >
            Search my job
          </Button>
        </Box>

        <Box className="popular-keywords">
          Popular : Pet Service, Cleaner, IT Developer
        </Box>
      </Stack>
    </>
  );
};

HeaderFilter.defaultProps = {
  initialInput: {
    page: 1,
    limit: 9,
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

export default HeaderFilter;
