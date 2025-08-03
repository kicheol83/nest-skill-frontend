import withLayoutNew from "@/libs/components/layout/LayoutNew";
import { Stack } from "@mui/material";
import { NextPage } from "next";
import { Typography, Button, Pagination, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";
import CommunityCard from "@/libs/components/common/CommunityCard";
import { useState } from "react";

const Community: NextPage = () => {
  const router = useRouter();
  const [communityNew, setCommunityNew] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);

  return (
    <Stack className="community-basic">
      <Stack className="container">
        <TabContext value={"FREE"}>
          <Stack className="main-box">
            <Stack className="left-config">
              <Stack className={"image-info"}>
                <img src={"/icons/nest-logo.svg"} />
                <Stack className={"community-name"}>
                  <Typography className={"name"}>
                    Skill Nest Community
                  </Typography>
                </Stack>
              </Stack>

              <TabList
                orientation="vertical"
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
              >
                <Tab
                  value={"FREE"}
                  label={"Free Board"}
                  className={"tab-button"}
                />
                <Tab
                  value={"RECOMMEND"}
                  label={"Recommendation"}
                  className={"tab-button "}
                />
                <Tab value={"NEWS"} label={"News"} className={"tab-button"} />
                <Tab
                  value={"HUMOR"}
                  label={"Humor"}
                  className={"tab-button "}
                />
              </TabList>
            </Stack>
            <Stack className="right-config">
              <Stack className="panel-config">
                <Stack className="title-box">
                  <Stack className="left">
                    <Typography className="title">FREE BOARD</Typography>
                    <Typography className="sub-title">
                      Express your opinions freely here without content
                      restrictions
                    </Typography>
                  </Stack>
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: "/mypage",
                        query: {
                          category: "writeArticle",
                        },
                      })
                    }
                    className="right"
                  >
                    Write
                  </Button>
                </Stack>

                <TabPanel value="FREE">
                  <Stack className="list-box">
                    {communityNew.map((article, index) => {
                      return <CommunityCard index={index} />;
                    })}
                  </Stack>
                </TabPanel>
                <TabPanel value="RECOMMEND">
                  <Stack className="list-box">
                    <CommunityCard />
                  </Stack>
                </TabPanel>
                <TabPanel value="NEWS">
                  <Stack className="list-box">
                    <CommunityCard />
                  </Stack>
                </TabPanel>
                <TabPanel value="HUMOR">
                  <Stack className="list-box">
                    <CommunityCard />
                  </Stack>
                </TabPanel>
              </Stack>
            </Stack>
          </Stack>
        </TabContext>

        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination count={10} page={1} shape="circular" color="primary" />
          </Stack>
          <Stack className="total-result">
            <Typography>Total 1 article available</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutNew(Community);
