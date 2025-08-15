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
import { Member } from "@/libs/types/member/member";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";

interface ProviderCardProps {
  provider: any;
  likeMemberHandler: any;
}

const ProviderCard = (props: ProviderCardProps) => {
  const { provider, likeMemberHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const pushDetailHandler = async (providerId: string) => {
    await router.push({
      pathname: "/provider/detail",
      query: { id: providerId },
    });
  };

  if (device === "mobile") {
    return <div>PROVIDER C ARD</div>;
  } else {
    return (
      <Card className="provider-card">
        <Box className="image-wrapper">
          <Avatar
            src="/img/banner/d.avif"
            alt=""
            className="avatar"
            onClick={() => pushDetailHandler(provider._id)}
          />
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
            {provider.memberNick}
          </Typography>
          <Typography variant="body2" className="title">
            {provider.memberJobs} jobs created
          </Typography>
          <Chip label="AGENT" size="small" className="type-chip" />

          <Stack direction="row" spacing={2} className="stats" mt={4}>
            <Stack className="statsWrapper">
              <Box className="view-like">
                <Box
                  className="statItem"
                  onClick={() => likeMemberHandler(user, provider?._id)}
                >
                  {provider?.meLiked && provider?.meLiked[0]?.myFavorite ? (
                    <FavoriteIcon
                      className="icon"
                      fontSize="small"
                      sx={{ color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      className="icon"
                      fontSize="small"
                    />
                  )}

                  <Typography>{provider.memberLikes}</Typography>
                </Box>
                <Box className="statItem1">
                  <VisibilityOutlinedIcon className="icon" fontSize="small" />
                  <Typography>{provider.memberViews}</Typography>
                </Box>
              </Box>
            </Stack>

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
