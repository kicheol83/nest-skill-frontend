import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProviderPost } from "@/libs/types/provider-post/provider-post";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";

interface ServiceJobsCardProps {
  providerPost: ProviderPost;
  likeProviderPostHandler: any;
}

const ServiceJobsCard = (props: ServiceJobsCardProps) => {
  const { providerPost, likeProviderPostHandler } = props;
  const router = useRouter();
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);

  /** HANDLERS **/
  const pushDetailHandler = async (orderId: string) => {
    await router.push({
      pathname: "/order",
      query: { id: orderId },
    });
  };

  const pushServiceDetailHandler = async (providerPostId: string) => {
    await router.push({
      pathname: "/service/detail",
      query: { id: providerPostId },
    });
  };

  if (device === "mobile") {
    return <div>ServiceJobs CARD</div>;
  } else {
    return (
      <Box className="jobs-card" key={providerPost._id}>
        <Box className="main-content">
          <Box className="card">
            <Avatar
              alt="Remy Sharp"
              src="/img/profile/men.webp"
              sx={{ width: 64, height: 64, margin: "0px 4px" }}
            />
            <Box className="box-title">
              <span className="p-type">{providerPost?.providerTitle}</span>
              <Stack
                className="title-location"
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <span>{providerPost?.providerRateType}</span>
                <img src="/img/job/black.svg" alt="" />
                <span>{providerPost?.providerLocation}</span>
              </Stack>
            </Box>
          </Box>
          <Box className="bot-buttons">
            <Button className="button1">
              {providerPost?.providerWorkWeekday}
            </Button>
            <div className="line"></div>
            <Button className="button2">{providerPost?.providerLevel}</Button>
            <Button className="button3">{providerPost?.providerType}</Button>
            <Box className="view-like">
              <Box
                className="statItem"
                onClick={() => likeProviderPostHandler(user, providerPost?._id)}
              >
                {providerPost?.meLiked &&
                providerPost?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon
                    className="icon"
                    fontSize="small"
                    sx={{ color: "red" }}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    className="icon"
                    fontSize="small"
                  />
                )}

                <Typography>{providerPost.providerLikes}</Typography>
              </Box>
              <Box className="statItem1">
                <VisibilityOutlinedIcon className="icon" fontSize="small" />
                <Typography>{providerPost?.providerViews}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="payment">
          <Button
            onClick={() => pushDetailHandler(providerPost._id)}
            className="payme"
          >
            Order {providerPost.providerWorkPrice}$
          </Button>
          <Button
            onClick={() => pushServiceDetailHandler(providerPost._id)}
            className="payme1"
          >
            View
          </Button>
        </Box>
      </Box>
    );
  }
};

export default ServiceJobsCard;
