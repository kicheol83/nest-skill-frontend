import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
  children,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontWeight="bold">{title}</Typography>
        <IconButton onClick={() => setOpen(!open)} size="small">
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            control={
              <Checkbox
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
              />
            }
            label={opt}
            sx={{ display: "block", ml: 1 }}
          />
        ))}

        {selected.includes("Custom (9)") && (
          <Box pl={2} pt={1}>
            {children}
          </Box>
        )}
      </Collapse>
    </Box>
  );
};
export default FilterSection;
