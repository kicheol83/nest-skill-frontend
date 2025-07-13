import { Box, Container, Stack } from "@mui/material";
import { brown, green } from "@mui/material/colors";

export default function Home() {
  return (
    <>
      <Stack sx={{ background: green[300] }}>Header</Stack>
      <Container>
        <Stack flexDirection={"column"}>
          <Box>BOX 1</Box>
          <Box>BOX 2</Box>
          <Box>BOX 3</Box>
        </Stack>
      </Container>
      <Stack sx={{ background: brown[300] }}>Footer</Stack>
    </>
  );
}
