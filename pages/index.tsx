import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Box, Container, Stack } from "@mui/material";
import { brown, green } from "@mui/material/colors";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <Stack flexDirection={"column"}>
          <Box>BOX 1</Box>
          <Box>BOX 2</Box>
          <Box>BOX 3</Box>
        </Stack>
      </Container>
    </>
  );
};

export default withLayoutMain(Home);
