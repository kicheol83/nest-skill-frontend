import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const MyPage: NextPage = () => {
  return (
    <>
      <Container>MY PAGE</Container>
    </>
  );
};

export default withLayoutBasic(MyPage);
