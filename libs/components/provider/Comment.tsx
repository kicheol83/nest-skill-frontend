import React from "react";
import { Avatar, Box, Typography, Stack, Paper } from "@mui/material";
import { Comment } from "@/libs/types/comment/comment";
import Moment from "react-moment";
import { REACT_APP_API_URL } from "@/libs/config";

interface CommentBoxProps {
  fromMyPage?: string;
  comment: Comment;
}

const CommentBox = (props: CommentBoxProps) => {
  const { fromMyPage, comment } = props;
  return (
    <Paper elevation={2} className="comment-box">
      <Stack direction="row" spacing={2}>
        <Avatar
          src={
            comment?.memberData?.memberImage
              ? `${REACT_APP_API_URL}/${comment?.memberData?.memberImage}`
              : "/img/profile/defaultUser.svg"
          }
          alt=""
          className="comment-avatar"
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {comment.memberData?.memberNick}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Moment format={"DD MMMM"}>{comment.createdAt}</Moment>
          </Typography>
          <Typography variant="body1" className="comment-text">
            {comment.commentContent}
          </Typography>
          {fromMyPage && (
            <Stack className="reply-button-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_7037_6550)">
                  <path
                    d="M6.66667 4.67077V1.8361C6.66667 1.63544 6.546 1.4541 6.36133 1.37544C6.17733 1.29744 5.962 1.33677 5.81867 1.47744L0.152 6.97744C0.0546667 7.07144 0 7.20077 0 7.3361C0 7.47144 0.0546667 7.60077 0.152 7.69477L5.81867 13.1948C5.96333 13.3348 6.178 13.3741 6.36133 13.2968C6.546 13.2181 6.66667 13.0368 6.66667 12.8361V10.0028H7.612C10.7027 10.0028 13.552 11.6828 15.0473 14.3841L15.0613 14.4094C15.1507 14.5721 15.32 14.6694 15.5 14.6694C15.5413 14.6694 15.5827 14.6648 15.624 14.6541C15.8453 14.5974 16 14.3981 16 14.1694C16 8.98677 11.8287 4.7601 6.66667 4.67077Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7037_6550">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Typography className="reply-text">Reply</Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CommentBox;
