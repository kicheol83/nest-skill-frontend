import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Grid, Stepper, Step, StepLabel } from "@mui/material";

import Info from "@/libs/components/order/Info";
import AddressForm from "@/libs/components/order/AddressForm";
import PaymentForm from "@/libs/components/order/PaymentForm";
import Review from "@/libs/components/order/ReviewOrder";
import withLayoutNew from "@/libs/components/layout/LayoutNew";

import { GET_PROVIDER_POST } from "@/apollo/user/query";
import { CREATE_ORDER } from "@/apollo/user/mutation";
import { CREATE_PAYMENT } from "@/apollo/user/mutation";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { PaymentMethod } from "@/libs/enums/payment.enum";
import { sweetErrorHandling, sweetMixinErrorAlert } from "@/libs/sweetAlert";

const steps = ["Shipping address", "Payment details", "Review your order"];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { query } = router;
  const providerId = query?.id as string;

  const [providerPost, setProviderPost] = useState<ProviderPost>();
  const [addressData, setAddressData] = useState<any>();
  const [paymentData, setPaymentData] = useState<any>();
  const [orderData, setOrderData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { data: providerData } = useQuery(GET_PROVIDER_POST, {
    variables: { input: providerId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (providerData?.getProvider) {
      setProviderPost(providerData.getProvider);
    }
  }, [providerData]);

  const [createOrder] = useMutation(CREATE_ORDER);
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Step 0 → AddressForm submit
  const handleAddressSubmit = async () => {
    if (!addressData) {
      sweetErrorHandling("Please fill the address first!");
      return;
    }

    try {
      const { data } = await createOrder({
        variables: {
          input: {
            itemPrice: providerPost?.providerWorkPrice,
            providerId,
            address: addressData,
          },
        },
      });

      if (data?.createOrder?._id) {
        setOrderData(data.createOrder);
        handleNext(); // Move to Payment step
      }
    } catch (err: any) {
      console.log("Order creation failed:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const handlePaymentSuccess = async () => {
    if (!orderData?._id) {
      sweetErrorHandling("Order ID missing!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await createPayment({
        variables: {
          input: {
            orderId: orderData._id,
            paymentAmount: (providerPost?.providerWorkPrice ?? 0) + 10,
            paymentMethod: PaymentMethod.CARD,
          },
        },
      });

      if (data?.createPayment?._id) {
        setPaymentData(data.createPayment);
        handleNext(); // Move to Review step
      }
    } catch (err: any) {
      console.log("Payment failed:", err.message);
      sweetMixinErrorAlert(err.message).then();
    } finally {
      setLoading(false);
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            providerId={providerId}
            itemPrice={providerPost?.providerWorkPrice}
            onSubmit={(address) => setAddressData(address)}
            handleAddressSubmit={handleAddressSubmit}
          />
        );
      case 1:
        return (
          <PaymentForm
            orderId={orderData?._id || ""}
            total={providerPost?.providerWorkPrice || 0}
            handlePaymentSuccess={handlePaymentSuccess}
          />
        );
      case 2:
        return (
          <Review
            total={providerPost?.providerWorkPrice || 0}
            address={addressData}
            payment={paymentData}
            order={orderData}
            providerPost={providerPost}
          />
        );
      default:
        sweetErrorHandling("Unknown step");
    }
  }

  return (
    <Grid
      container
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}
    >
      {/* Left panel */}
      <Grid
        xs={12}
        sm={5}
        lg={4}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          backgroundColor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          pt: 16,
          px: 10,
          gap: 4,
        }}
      >
        <Info providerPost={providerPost} />
      </Grid>

      {/* Right panel */}
      <Grid
        item
        sm={12}
        md={7}
        lg={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: { xs: "100%", sm: "600px", md: "700px" },
          mx: "auto",
          pt: { xs: 2, sm: 16 },
          px: { xs: 2, sm: 4 },
          gap: 4,
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ display: { xs: "flex", md: "flex" } }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        {/* Navigation Buttons */}
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {activeStep !== 0 && (
            <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack}>
              Previous
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button
              variant="contained"
              endIcon={<ChevronRightRoundedIcon />}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box> */}
      </Grid>
    </Grid>
  );
}

export default withLayoutNew(Checkout);
