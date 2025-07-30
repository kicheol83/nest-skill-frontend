import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

export default function WorkTimePicker() {
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("18:00");

  return (
    <Box display="flex" mt={4} gap={2} alignItems="center">
      <Typography fontWeight="600">Work Time:</Typography>

      <TextField
        label="Start"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />

      <TextField
        label="End"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </Box>
  );
}
