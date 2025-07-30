import React, { useState } from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";
import FilterSection from "../filter-section/FilterSection";
import ProviderLevelFilter from "../filter-section/ProviderLevelFilter";
import WorkTimePicker from "../filter-section/WorkTimeSection";
import PriceSlider from "../filter-section/PriceSection";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function FilterSidebar() {
  const [employmentSelected, setEmploymentSelected] = useState<string[]>([]);
  const [weekdaySelected, setWeekdaySelected] = useState<string[]>([]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);

  const handleToggle = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Box>
      <FilterSection
        title="Location"
        options={[
          "SEOUL",
          "BUSAN",
          "INCHEON",
          "DAEGU",
          "GYEONGJU",
          "GWANGJU",
          "CHONJU",
          "DEAJON",
          "JEJU",
        ]}
        selected={categorySelected}
        onToggle={(val) => handleToggle(val, setCategorySelected)}
      />

      <FilterSection
        title="Type of Employment"
        options={[
          "Week-Days (19)",
          "Weekends (15)",
          "Full-Week (22)",
          "Custom (9)",
        ]}
        selected={employmentSelected}
        onToggle={(val) => handleToggle(val, setEmploymentSelected)}
      >
        {weekdays.map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={weekdaySelected.includes(day)}
                onChange={() => handleToggle(day, setWeekdaySelected)}
              />
            }
            label={day}
            sx={{ display: "block", ml: 2 }}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Categories"
        options={[
          "Plumbing (2)",
          "Cleaning (4)",
          "Babysitting (11)",
          "Tutoring (7)",
          "Gardening (13)",
          "Electrician (2)",
          "Cooking (1)",
          "Driving (17)",
          "Painting (6)",
          "Carpentry (4)",
        ]}
        selected={categorySelected}
        onToggle={(val) => handleToggle(val, setCategorySelected)}
      />
      <ProviderLevelFilter title="Provider level" />
      <WorkTimePicker />
      <PriceSlider />
    </Box>
  );
}
