import withLayoutProvider from "@/libs/components/layout/LayoutProvider";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const Provider: NextPage = () => {
  return (
    <>
      <Container>PROVIDER PAGE</Container>
    </>
  );
};

export default withLayoutProvider(Provider);
