import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const ServicePage: NextPage = () => {
  return (
    <>
      <Container>
        <Stack flexDirection={"column"}>
          <Stack>
            <Stack className="container">BOX 1</Stack>
          </Stack>
          <Stack>
            <Stack className="container">BOX 2</Stack>
          </Stack>
          <Stack>
            <Stack className="container">BOX 3</Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default withLayoutBasic(ServicePage);
