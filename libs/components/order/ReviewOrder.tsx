import * as React from "react";
import {
  Paper,
  Stack,
  Typography,
  Grid,
  Divider,
  Box,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaidIcon from "@mui/icons-material/Paid";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useRouter } from "next/router";

interface Address {
  fullName: string;
  phone: string;
  city: string;
  street: string;
  zipcode?: string;
}

interface Payment {
  paymentMethod: string;
  paymentAmount: number;
  transactionId: string;
  createdAt: string;
}

interface Order {
  _id: string;
  address: Address;
  payment?: Payment | null;
  totalPrice: number;
}

interface ReviewProps {
  providerPost: any;
  address?: Address;
  payment?: Payment | null;
  order?: Order;
  total?: number;
}

export default function Review({
  providerPost,
  address,
  payment,
  order,
  total,
}: ReviewProps) {
  const router = useRouter();
  const displayAddress = address || order?.address;
  const displayPayment = payment || order?.payment;
  const displayTotal = total || order?.totalPrice || 0;

  if (!displayAddress) return <Typography>No address provided</Typography>;

  return (
    <Grid container spacing={3} sx={{ mt: 2, width: "100%" }}>
      <Grid item xs={12}>
        <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Review Your Order
          </Typography>
          <Stack spacing={3} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon color="primary" />
              <Typography>
                Provider:{" "}
                <strong>{providerPost?.memberData?.memberNick}</strong>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnIcon color="secondary" />
              <Typography>
                Shipping Address: <strong>{displayAddress.fullName}</strong>,{" "}
                {displayAddress.street}, {displayAddress.city}{" "}
                {displayAddress.zipcode || ""}
              </Typography>
            </Box>

            {displayPayment && (
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  {displayPayment.paymentMethod === "CARD" ? (
                    <CreditCardIcon color="action" />
                  ) : (
                    <AccountBalanceWalletIcon color="action" />
                  )}
                  <Typography>
                    Payment Method:{" "}
                    <strong>
                      {displayPayment.paymentMethod === "CARD"
                        ? "Credit / Debit Card"
                        : "Wallet / Balance"}
                    </strong>
                  </Typography>
                </Box>
                <Typography>
                  Transaction ID:{" "}
                  <strong>{displayPayment.transactionId}</strong>
                </Typography>
                <Typography>
                  Paid Amount:{" "}
                  <strong>${displayPayment.paymentAmount + 10}</strong>
                </Typography>
                <Typography>
                  Paid At:{" "}
                  <strong>
                    {new Date(displayPayment.createdAt).toLocaleString()}
                  </strong>
                </Typography>
              </Box>
            )}

            <Divider />
            <Box display="flex" alignItems="center" gap={1}>
              <PaidIcon color="success" />
              <Typography variant="h6">
                Total: <strong>${displayTotal + 10}</strong>
              </Typography>
              <Button
                sx={{
                  background: "green",
                  color: "#fff",
                  "&:hover": {
                    background: "green", // hover bo'lganda ham rang o'zgarmaydi
                  },
                }}
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
