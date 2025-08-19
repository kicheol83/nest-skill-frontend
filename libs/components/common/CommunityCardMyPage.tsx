import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";
import Moment from "react-moment";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CommunityCardProps {
  boardArticle: BoardArticle;
  likeArticleHandler: any;
}

const CommunityCardMyPage = (props: CommunityCardProps) => {
  const { boardArticle, likeArticleHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const imagePath: string = boardArticle?.articleImage
    ? `${REACT_APP_API_URL}/${boardArticle?.articleImage}`
    : "/img/article-img.avif";

  /** HANDLERS **/
  const chooseArticleHandler = (
    e: React.SyntheticEvent,
    boardArticle: BoardArticle
  ) => {
    router.push(
      {
        pathname: "/community/detail",
        query: {
          articleCategory: boardArticle?.articleCategory,
          id: boardArticle?._id,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const goMemberPage = (id: string) => {
    if (id === user?._id) router.push("/mypage");
    else router.push(`/member?memberId=${id}`);
  };

  return (
    <Card
      className="post-card"
      onClick={(e: any) => chooseArticleHandler(e, boardArticle)}
    >
      <Box className="imageWrapper">
        <img src={imagePath} alt="" className="cardImage" />
        <Box className="dateBox">
          <Typography variant="body2" className="month">
            <Moment format={"MM"}>{boardArticle?.createdAt}</Moment>
          </Typography>
          <Typography variant="h6" className="day">
            <Moment className="month" format={"MMMM"}>
              {boardArticle?.createdAt}
            </Moment>
          </Typography>
        </Box>
      </Box>
      <CardContent className="cardContent">
        <Typography
          variant="subtitle1"
          className="title"
          onClick={(e: any) => {
            e.stopPropagation();
            goMemberPage(boardArticle?.memberData?._id as string);
          }}
        >
          {boardArticle?.memberData?.memberNick}
        </Typography>
        <Typography variant="body2" className="category">
          {boardArticle?.articleTitle}
        </Typography>
        <Box className="view-like">
          <Box
            className="statItem"
            onClick={(e) => likeArticleHandler(e, user, boardArticle?._id)}
          >
            {boardArticle?.meLiked && boardArticle?.meLiked[0]?.myFavorite ? (
              <FavoriteIcon
                className="icon"
                fontSize="small"
                sx={{ color: "red" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon className="icon" fontSize="small" />
            )}

            <Typography>{boardArticle.articleLikes}</Typography>
          </Box>
          <Box className="statItem1">
            <VisibilityOutlinedIcon className="icon" fontSize="small" />
            <Typography>{boardArticle.articleViews}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommunityCardMyPage;
