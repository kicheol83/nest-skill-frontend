import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const Provider: NextPage = () => {
  return (
    <>
      <Container>PROVIDER PAGE</Container>
    </>
  );
};

export default withLayoutBasic(Provider);
