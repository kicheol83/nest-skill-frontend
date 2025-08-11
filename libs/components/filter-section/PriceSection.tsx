import React, { useState } from "react";
import { Box, Slider, Typography, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function PriceSlider() {
  const [value, setValue] = useState<number[]>([0, 500]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleDecrease = () => {
    setValue(([min, max]) => [
      Math.max(min - 1, 0),
      Math.max(max - 1, min - 1 >= 0 ? min - 1 : max),
    ]);
  };

  const handleIncrease = () => {
    setValue(([min, max]) => [Math.min(min + 1, max), Math.min(max + 1, 500)]);
  };

  return (
    <Box className="price" width="250px">
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography className="price-title" fontWeight="bold">
          PRICE
        </Typography>

        <Box>
          <IconButton size="small" onClick={handleDecrease}>
            <RemoveIcon />
          </IconButton>
          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="off"
        min={0}
        max={500}
        sx={{
          color: "primary.main",
          height: 8,
          "& .MuiSlider-thumb": {
            height: 24,
            width: 24,
            backgroundColor: "#fff",
            border: "2px solid currentColor",
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(0, 123, 255, 0.16)",
            },
          },
        }}
      />

      <Box display="flex" justifyContent="center" mt={1}>
        <Typography>
          ${value[0]} ~ ${value[1]}
        </Typography>
      </Box>
    </Box>
  );
}
