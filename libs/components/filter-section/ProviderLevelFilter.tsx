import React, { useState } from "react";
import { Chip, Box, Typography } from "@mui/material";

const levels = ["NEW", "BRONZE", "SILVER", "GOLD", "PLATINUM", "VERIFIED"];
const days = [1, 2, 3, 4, 5, 6, 7];

export default function ProviderLevelFilter({ title }: { title: string }) {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay((prev) => (prev === day ? null : day));
  };

  return (
    <Box>
      {/* Title */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography fontWeight="bold">{title}</Typography>
      </Box>

      {/* Levels */}
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {levels.map((level) => {
          const isSelected = selectedLevels.includes(level);
          return (
            <Chip
              key={level}
              label={level}
              clickable
              onClick={() => handleLevelToggle(level)}
              sx={{
                backgroundColor: isSelected ? "#1976d2" : "grey.300",
                color: isSelected ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: isSelected ? "#1976d2" : "grey.400",
                },
              }}
            />
          );
        })}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography fontWeight="bold">Days Limit</Typography>
      </Box>
      {/* Days - only one selectable */}
      <Box display="flex" flexWrap="wrap" gap={1}>
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <Chip
              key={day}
              label={`Day ${day}`}
              clickable
              onClick={() => handleDaySelect(day)}
              sx={{
                backgroundColor: isSelected ? "rgb(38, 164, 255)" : "grey.300",
                color: isSelected ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgb(38, 164, 255)"
                    : "grey.400",
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
