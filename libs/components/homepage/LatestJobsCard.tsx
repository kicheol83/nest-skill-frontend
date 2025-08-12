import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useRouter } from "next/router";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import { REACT_APP_API_URL } from "@/libs/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

interface LatestCardProps {
  latest: ProviderPost;
  likeLatestHandler: any;
}

const LatestJobsCard = (props: LatestCardProps) => {
  const { latest, likeLatestHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);

  /** HANDLERS **/
  const pushDetailHandler = async (latestId: string) => {
    console.log(":", latestId);
    await router.push({
      pathname: "/service/detail",
      query: { id: latestId },
    });
  };

  if (device === "mobile") {
    return <div>CATEGORY CARD</div>;
  } else {
    return (
      <Stack className="latest-card" key={latest._id}>
        <Box className="latest-box">
          <Avatar
            alt=""
            src={
              latest?.providerImages?.[0]
                ? `${REACT_APP_API_URL}/${latest.providerImages[0]}`
                : "/icons/default-avatar.jpg"
            }
            sx={{ width: 64, height: 64, margin: "0px 4px" }}
          />
          <Box
            className="box-title"
            onClick={() => pushDetailHandler(latest._id)}
          >
            <span className="p-type">{latest.providerTitle}</span>
            <Stack
              className="title-location"
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span>{latest.providerDesc}</span>
              <img src="/img/job/black.svg" alt="" />
              <span>{latest.providerLocation}</span>
            </Stack>
          </Box>
        </Box>
        <Box className="bot-buttons">
          <Button className="button1">{latest.providerRateType}</Button>
          <div className="line"></div>
          <Button className="button2">{latest.providerLevel}</Button>
          <Button className="button3">{latest.providerType}</Button>
          <Box className="view-like">
            <Box
              className="statItem"
              onClick={() => likeLatestHandler(user, latest?._id)}
            >
              {latest?.meLiked && latest?.meLiked[0]?.myFavorite ? (
                <FavoriteIcon
                  className="icon"
                  fontSize="small"
                  sx={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
              )}

              <Typography>{latest.providerLikes}</Typography>
            </Box>
            <Box className="statItem1">
              <VisibilityOutlinedIcon className="icon" fontSize="small" />
              <Typography>{latest.providerViews}</Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  }
};

export default LatestJobsCard;
