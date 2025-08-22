import * as React from "react";
import { useState } from "react";
import {
  Stack,
  Grid,
  Typography,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";

interface AddressFormProps {
  handleAddressSubmit: any;
  providerId?: string;
  itemPrice?: number;
  onSubmit: (address: {
    fullName: string;
    phone: string;
    city: string;
    street: string;
    zipcode?: string;
  }) => void;
}

export default function AddressForm({
  providerId,
  itemPrice,
  onSubmit,
  handleAddressSubmit,
}: AddressFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [isSaved, setIsSaved] = useState(false); // Save tugmasi bosilganini belgilash

  const handleSubmit = () => {
    if (!firstName || !lastName || !phone || !city || !street) {
      alert("Please fill all required fields!");
      return;
    }

    const address = {
      fullName: `${firstName} ${lastName}`,
      phone,
      city,
      street,
      zipcode: zipcode || "",
    };

    onSubmit(address);
    setIsSaved(true);
  };

  return (
    <Grid container spacing={3} display="flex" flexDirection="column">
      <Stack spacing={2}>
        <Typography variant="h6">Shipping Address</Typography>
        <OutlinedInput
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <OutlinedInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <OutlinedInput
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <OutlinedInput
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <OutlinedInput
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <OutlinedInput
          placeholder="Zipcode (optional)"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        {/* Tugmalar */}
        <Box display="flex" gap={2} mt={2}>
          {!isSaved && (
            <Button
              variant="contained"
              sx={{ background: "green", color: "#fff" }}
              onClick={handleSubmit}
            >
              Save Address
            </Button>
          )}

          {isSaved && (
            <Button
              variant="contained"
              sx={{ background: "green", color: "#fff" }}
              onClick={handleAddressSubmit}
            >
              Create Order
            </Button>
          )}
        </Box>
      </Stack>
    </Grid>
  );
}
