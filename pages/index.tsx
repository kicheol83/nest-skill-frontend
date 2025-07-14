import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Stack>
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
      </Stack>
    </>
  );
};

export default withLayoutMain(Home);
