import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import MessageIcon from "@mui/icons-material/Message";
import CircleIcon from "@mui/icons-material/Circle";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ProviderCard = () => {
  const device = useDeviceDetect();
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  if (device === "mobile") {
    return <div>PROVIDER C ARD</div>;
  } else {
    return (
      <Card className="provider-card">
        <Box className="image-wrapper">
          <Avatar src="/img/banner/d.avif" alt="" className="avatar" />
          <Chip
            label={isOnline ? "Online" : "Offline"}
            icon={
              <CircleIcon
                sx={{
                  color: isOnline ? "green" : "gray",
                  fontSize: "12px",
                  "&.MuiSvgIcon-root": {
                    color: `${isOnline ? "green" : "gray"} !important`,
                  },
                }}
              />
            }
            className="status-chip"
            size="small"
          />
        </Box>
        <CardContent className="card-content">
          <Typography variant="h6" className="name">
            Jane Smith
          </Typography>
          <Typography variant="body2" className="title">
            Math Tutor
          </Typography>
          <Chip label="PHOTOGRAPH" size="small" className="type-chip" />

          <Stack direction="row" spacing={2} className="stats">
            <Stack className="statsWrapper">
              <Box className="statItem">
                <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
                <Typography>11</Typography>
              </Box>
            </Stack>
            <Box className="statItem1">
              <VisibilityOutlinedIcon className="icon" fontSize="small" />
              <Typography>10</Typography>
            </Box>
            <Box className="stat">
              <IconButton
                onClick={() => setShowMessageInput(!showMessageInput)}
                size="small"
              >
                <MessageIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>

          {showMessageInput && (
            <Box className="message-input">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Write a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SendIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
};

export default ProviderCard;
