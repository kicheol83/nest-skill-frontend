import React, { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  Box,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { ProviderJobsInquiry } from "@/libs/types/provider-post/provider-post.input";
import { useRouter } from "next/router";
import {
  ProviderLevel,
  ProviderLocation,
  ProviderRateType,
  ProviderType,
  ProviderWeekday,
  ProviderWorkWeekday,
} from "@/libs/enums/provider.enum";

interface FilterType {
  searchFilter: ProviderJobsInquiry;
  setSearchFilter: any;
  initialInput: ProviderJobsInquiry;
}

export default function FilterSidebar(props: FilterType) {
  const router = useRouter();
  const [showMore, setShowMore] = useState<boolean>(false);
  const toggleShowMore = () => setShowMore((prev) => !prev);
  const { searchFilter, setSearchFilter, initialInput } = props;

  const [searchText, setSearchText] = useState<string>("");
  const [customOpen, setCustomOpen] = useState(false);

  const handleWorkWeekdayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value as ProviderWorkWeekday;
    providerPostWorkWeekDaySelectHandler(event);

    if (value === ProviderWorkWeekday.CUSTOM) {
      setCustomOpen(event.target.checked);
    }
  };

  /** LIFECYCLES **/
  useEffect(() => {
    if (searchFilter?.search?.locationList?.length == 0) {
      delete searchFilter.search.locationList;
      setShowMore(false);
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.typeList?.length == 0) {
      delete searchFilter.search.typeList;
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.rateRangeList?.length == 0) {
      delete searchFilter.search.rateRangeList;
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.levelList?.length == 0) {
      delete searchFilter.search.levelList;
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.workWeekdayList?.length == 0) {
      delete searchFilter.search.workWeekdayList;
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

      if (searchFilter?.search?.weekList?.length == 0) {
      delete searchFilter.search.weekList;
      router
        .push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.locationList) setShowMore(true);
  }, [searchFilter]);

  /** HANDLERS **/
  const providerPostLocationSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                locationList: [
                  ...(searchFilter?.search?.locationList || []),
                  value,
                ],
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                locationList: [
                  ...(searchFilter?.search?.locationList || []),
                  value,
                ],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.locationList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                locationList: searchFilter?.search?.locationList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                locationList: searchFilter?.search?.locationList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.locationList?.length == 0) {
          alert("error");
        }

        console.log("providerPostLocationSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostLocationSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const providerPostTypeSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: [...(searchFilter?.search?.typeList || []), value],
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: [...(searchFilter?.search?.typeList || []), value],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.typeList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: searchFilter?.search?.typeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: searchFilter?.search?.typeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.typeList?.length == 0) {
          alert("error");
        }

        console.log("providerPostTypeSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostTypeSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const providerPostLevelSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                levelList: [...(searchFilter?.search?.levelList || []), value],
              },
            })}`,

            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                levelList: [...(searchFilter?.search?.levelList || []), value],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.levelList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                levelList: searchFilter?.search?.levelList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                levelList: searchFilter?.search?.levelList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.levelList?.length == 0) {
          alert("error");
        }

        console.log("providerPostLevelSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostLevelSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const providerPostWorkWeekDaySelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                workWeekdayList: [
                  ...(searchFilter?.search?.workWeekdayList || []),
                  value,
                ],
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                workWeekdayList: [
                  ...(searchFilter?.search?.workWeekdayList || []),
                  value,
                ],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.workWeekdayList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                workWeekdayList: searchFilter?.search?.workWeekdayList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                workWeekdayList: searchFilter?.search?.workWeekdayList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.workWeekdayList?.length == 0) {
          alert("error");
        }

        console.log("providerPostLocationSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostLocationSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const providerPostkWeekDaySelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                weekList: [...(searchFilter?.search?.weekList || []), value],
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                weekList: [...(searchFilter?.search?.weekList || []), value],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.weekList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                weekList: searchFilter?.search?.weekList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                weekList: searchFilter?.search?.weekList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.weekList?.length == 0) {
          alert("error");
        }

        console.log("providerPostkWeekDaySelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostkWeekDaySelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const providerPostRateSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                rateRangeList: [
                  ...(searchFilter?.search?.rateRangeList || []),
                  value,
                ],
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                rateRangeList: [
                  ...(searchFilter?.search?.rateRangeList || []),
                  value,
                ],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.rateRangeList?.includes(value)) {
          await router.push(
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                rateRangeList: searchFilter?.search?.rateRangeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/service?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                rateRangeList: searchFilter?.search?.rateRangeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.rateRangeList?.length == 0) {
          alert("error");
        }

        console.log("providerPostRateSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, providerPostRateSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const workPriceHandler = useCallback(
    async (value: number, type: string) => {
      if (type == "start") {
        await router.push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workPrice: {
                ...searchFilter.search.workPrice,
                start: value * 1,
              },
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workPrice: {
                ...searchFilter.search.workPrice,
                start: value * 1,
              },
            },
          })}`,
          { scroll: false }
        );
      } else {
        await router.push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workPrice: {
                ...searchFilter.search.workPrice,
                end: value * 1,
              },
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workPrice: {
                ...searchFilter.search.workPrice,
                end: value * 1,
              },
            },
          })}`,
          { scroll: false }
        );
      }
    },
    [searchFilter]
  );

  const refreshHandler = async () => {
    try {
      setSearchText("");
      await router.push(
        `/service?input=${JSON.stringify(initialInput)}`,
        `/service?input=${JSON.stringify(initialInput)}`,
        { scroll: false }
      );
    } catch (err: any) {
      console.log("ERROR, refreshHandler:", err);
    }
  };

  const workTimeHandler1 = useCallback(
    async (value: string, type: "start" | "end") => {
      const newSearchFilter = {
        ...searchFilter,
        search: {
          ...searchFilter.search,
          workTimeRange: {
            ...searchFilter.search.workTimeRange,
            [type]: value,
          },
        },
      };

      setSearchFilter(newSearchFilter);

      if (type === "start") {
        await router.push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workTimeRange: {
                ...searchFilter.search.workTimeRange,
                start: value,
              },
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workTimeRange: {
                ...searchFilter.search.workTimeRange,
                start: value,
              },
            },
          })}`,
          { scroll: false }
        );
      } else {
        await router.push(
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workTimeRange: {
                ...searchFilter.search.workTimeRange,
                end: value,
              },
            },
          })}`,
          `/service?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              workTimeRange: {
                ...searchFilter.search.workTimeRange,
                end: value,
              },
            },
          })}`,
          { scroll: false }
        );
      }
    },
    [searchFilter, router]
  );

  return (
    <Box sx={{ width: "318px" }}>
      <Stack className={"find-your-home"} mb={"40px"}>
        <Typography className={"title-main"}>Find Your Home</Typography>
        <Stack
          className={"input-box"}
          sx={{ alignItems: "center", gap: "8px" }}
        >
          <Stack sx={{ position: "relative", width: "300px" }}>
            <img
              src={"/img/icons/search_icon.png"}
              alt=""
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18px",
                height: "18px",
              }}
            />

            <input
              className="search-input"
              value={searchText}
              type="text"
              placeholder="What are you looking?"
              onChange={(e: any) => setSearchText(e.target.value)}
              onKeyDown={(event: any) => {
                if (event.key == "Enter") {
                  setSearchFilter({
                    ...searchFilter,
                    search: { ...searchFilter.search, text: searchText },
                  });
                }
              }}
              style={{
                width: "100%",
                paddingLeft: "35px", 
                paddingRight: "30px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
              }}
            />

            <CancelRoundedIcon
              onClick={() => {
                setSearchText("");
                setSearchFilter({
                  ...searchFilter,
                  search: { ...searchFilter.search, text: "" },
                });
              }}
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                cursor: "pointer",
              }}
            />
          </Stack>

          {/* Refresh icon input tashqarisida */}
          <Tooltip title="Reset">
            <IconButton onClick={refreshHandler}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack>
        {/* Location */}
        <Stack className="find-your-home expandable" mb={"30px"}>
          <Typography className="title">Location</Typography>
          <div className="filter-group limited-show">
            {Object.values(ProviderLocation).map((location, index) => (
              <label
                className={`input-box ${index >= 4 ? "extra hidden" : ""}`}
                key={location}
              >
                <Checkbox
                  id={location}
                  className="property-checkbox"
                  color="default"
                  size="small"
                  value={location}
                  onChange={providerPostLocationSelectHandler}
                  checked={(searchFilter?.search?.locationList || []).includes(
                    location as ProviderLocation
                  )}
                />
                <Typography className="property_type">{location}</Typography>
              </label>
            ))}
          </div>
        </Stack>

        {/* Provider Type */}
        <Stack className="find-your-home expandable" mb={"30px"}>
          <Typography className="title">Provider Type</Typography>
          <div className="filter-group limited-show">
            {Object.values(ProviderType).map((type, index) => (
              <label
                className={`input-box ${index >= 4 ? "extra hidden" : ""}`}
                key={type}
              >
                <Checkbox
                  id={type}
                  className="property-checkbox"
                  color="default"
                  size="small"
                  value={type}
                  onChange={providerPostTypeSelectHandler}
                  checked={(searchFilter?.search?.typeList || []).includes(
                    type as ProviderType
                  )}
                />
                <Typography className="property_type">{type}</Typography>
              </label>
            ))}
          </div>
        </Stack>

        {/* Level */}
        <Stack className="find-your-home" mb={"30px"}>
          <Typography className="title">Level</Typography>
          {Object.values(ProviderLevel).map((level) => (
            <Stack className="input-box" key={level}>
              <Checkbox
                id={level}
                className="property-checkbox"
                color="default"
                size="small"
                value={level}
                onChange={providerPostLevelSelectHandler}
                checked={(searchFilter?.search?.levelList || []).includes(
                  level as ProviderLevel
                )}
              />
              <label htmlFor={level} style={{ cursor: "pointer" }}>
                <Typography className="property_type">{level}</Typography>
              </label>
            </Stack>
          ))}
        </Stack>

        {/* Work Weekday */}
        <Stack className="find-your-home" mb={"30px"}>
          <Typography className="title">Work Weekday</Typography>
          {Object.values(ProviderWorkWeekday).map((day) => (
            <Stack className="input-box" key={day}>
              <Checkbox
                id={day}
                className="property-checkbox"
                color="default"
                size="small"
                value={day}
                onChange={handleWorkWeekdayChange}
                checked={(searchFilter?.search?.workWeekdayList || []).includes(
                  day
                )}
              />
              <label htmlFor={day} style={{ cursor: "pointer" }}>
                <Typography className="property_type">{day}</Typography>
              </label>
            </Stack>
          ))}

          {customOpen && (
            <Stack className="custom-weekday-menu" ml={3} mt={1}>
              {Object.values(ProviderWeekday).map((day) => (
                <Stack className="input-box" key={day}>
                  <Checkbox
                    id={`custom-${day}`}
                    className="property-checkbox"
                    color="default"
                    size="small"
                    value={day}
                    onChange={providerPostkWeekDaySelectHandler}
                    checked={(searchFilter?.search?.weekList || []).includes(
                      day as ProviderWeekday
                    )}
                  />
                  <label
                    htmlFor={`custom-${day}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography className="property_type">{day}</Typography>
                  </label>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        <Stack className="find-your-home" mb={"30px"}>
          <Typography className="title">Rate Range</Typography>
          {Object.values(ProviderRateType).map((rate) => (
            <Stack className="input-box" key={rate}>
              <Checkbox
                id={rate}
                className="property-checkbox"
                color="default"
                size="small"
                value={rate}
                onChange={providerPostRateSelectHandler}
                checked={(searchFilter?.search?.rateRangeList || []).includes(
                  rate as ProviderRateType
                )}
              />
              <label htmlFor={rate} style={{ cursor: "pointer" }}>
                <Typography className="property_type">{rate}</Typography>
              </label>
            </Stack>
          ))}
        </Stack>

        <Stack className={"find-your-home"}>
          <Typography className={"title"}>Work Price</Typography>
          <Stack className="square-year-input">
            <input
              type="number"
              placeholder="$ min"
              min={0}
              value={searchFilter?.search?.workPrice?.start ?? 0}
              onChange={(e: any) => {
                if (e.target.value >= 0) {
                  workPriceHandler(e.target.value, "start");
                }
              }}
            />
            <div className="central-divider"></div>
            <input
              type="number"
              placeholder="$ max"
              value={searchFilter?.search?.workPrice?.end ?? 0}
              onChange={(e: any) => {
                if (e.target.value >= 0) {
                  workPriceHandler(e.target.value, "end");
                }
              }}
            />
          </Stack>
        </Stack>

        <Stack className={"find-your-home"} spacing={2}>
          <Typography className={"title"}>Work Time</Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
          >
            <FormControl
              size="small"
              sx={{
                minWidth: 100,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                  "& fieldset": {
                    borderColor: "#c4c4c4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            >
              <Select
                labelId="start-time-label"
                value={searchFilter?.search?.workTimeRange?.start ?? "06:00"}
                onChange={(e) => workTimeHandler1(e.target.value, "start")}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#115293",
                        },
                      },
                    },
                  },
                }}
              >
                {Array.from({ length: 13 }, (_, i) => i + 6).map((h) => {
                  const hour = h.toString().padStart(2, "0");
                  return (
                    <MenuItem key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 100,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                  "& fieldset": {
                    borderColor: "#c4c4c4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            >
              <Select
                labelId="end-time-label"
                value={searchFilter?.search?.workTimeRange?.end ?? "18:00"}
                onChange={(e) => workTimeHandler1(e.target.value, "end")}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#115293",
                        },
                      },
                    },
                  },
                }}
              >
                {Array.from({ length: 13 }, (_, i) => i + 6).map((h) => {
                  const hour = h.toString().padStart(2, "0");
                  return (
                    <MenuItem key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
