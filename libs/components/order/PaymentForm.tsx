import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Stack,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PaymentMethod } from "@/libs/enums/payment.enum";

interface PaymentFormProps {
  orderId: any;
  total: number;
  handlePaymentSuccess: any;
}

export default function PaymentForm({
  orderId,
  total,
  handlePaymentSuccess,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [loading, setLoading] = useState(false);

  const totalSee = total + 10;

  return (
    <Grid container spacing={3} sx={{ mt: 2, width: "100%" }}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: { xs: 2, md: 4 },
            width: "100%",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Stack spacing={2} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <PaidIcon sx={{ color: "green" }} />
              <Typography>
                Amount to pay: <strong>${totalSee}</strong>
              </Typography>
            </Box>

            <FormControl fullWidth>
              {/* <InputLabel id="payment-method-label">Payment Method</InputLabel> */}
              <Select
                labelId="payment-method-label"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as PaymentMethod)
                }
              >
                <MenuItem value={PaymentMethod.CARD}>
                  <CreditCardIcon sx={{ mr: 1 }} /> Credit / Debit Card
                </MenuItem>
              </Select>
            </FormControl>

            <Divider />

            <Button
              variant="contained"
              sx={{ background: "green", color: "#fff" }}
              fullWidth
              onClick={handlePaymentSuccess}
              disabled={loading}
              endIcon={loading ? null : <CheckCircleIcon />}
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
