import React from "react";
import { Avatar, Box, Typography, Stack, Paper } from "@mui/material";

const CommentBox = () => {
  return (
    <Paper elevation={2} className="comment-box">
      <Stack direction="row" spacing={2}>
        <Avatar
          src="/img/banner/d.avif"
          alt="image"
          className="comment-avatar"
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            David Neza
          </Typography>
          <Typography variant="body2" color="text.secondary">
           2025.08.01
          </Typography>
          <Typography variant="body1" className="comment-text">
            The very good working
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CommentBox;
