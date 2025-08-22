import { useQuery } from "@apollo/client";
import { GET_PROVIDER_POST } from "@/apollo/user/query";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import Moment from "react-moment";

interface InfoProps {
  providerPost?: ProviderPost;
}

export default function Info(props: InfoProps) {
  const { providerPost } = props;
  const serviceFee = 10;
  const total = (providerPost?.providerWorkPrice ?? 0) + serviceFee;

  return (
    <>
      <Stack spacing={3}>
        <Paper sx={{ p: 2 }}>
          <Typography
            sx={{ fontFamily: "Space Grotesk" }}
            variant="h6"
            gutterBottom
          >
            Provider Info
          </Typography>
          <Typography sx={{ fontFamily: "Space Grotesk" }} variant="subtitle1">
            Post Creator Name:{" "}
            <span style={{ color: "blue" }}>
              {providerPost?.memberData?.memberNick}
            </span>
          </Typography>
          <Typography
            sx={{ fontFamily: "Space Grotesk" }}
            color="text.secondary"
          >
            Join at:
            <span style={{ color: "blue", marginLeft: "5px" }}>
              <Moment format={"DD MMMM"}>
                {providerPost?.memberData?.createdAt}
              </Moment>
            </span>
          </Typography>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Price Details
          </Typography>

          <List>
            <ListItem sx={{ py: 1 }}>
              <AttachMoneyIcon sx={{ mr: 2, color: "green" }} />
              <ListItemText primary="Service Price" />
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                <span style={{ color: "green" }}>
                  ${providerPost?.providerWorkPrice}
                </span>
              </Typography>
            </ListItem>

            <ListItem sx={{ py: 1 }}>
              <PaidIcon sx={{ mr: 2, color: "orange" }} />
              <ListItemText primary="Platform Fee" />
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                <span style={{ color: "green" }}>${serviceFee}</span>
              </Typography>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem sx={{ py: 1 }}>
              <AccountBalanceIcon sx={{ mr: 2, color: "blue" }} />
              <ListItemText primary="Total" />
              <Typography variant="h3">
                <span style={{ color: "green" }}>${total}</span>
              </Typography>
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </>
  );
}
