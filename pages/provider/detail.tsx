import withLayoutProviderDetail from "@/libs/components/layout/LayoutProviderDetail";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const ProviderPageDetail: NextPage = () => {
  return (
    <>
      <Container>PROVIDER PAGE DETAIL</Container>
    </>
  );
};

export default withLayoutProviderDetail(ProviderPageDetail);
