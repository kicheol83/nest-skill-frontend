import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@toast-ui/react-editor";

const TuiEditor = () => {
  /** APOLLO REQUESTS **/

  const memoizedValues = useMemo(() => {
    const articleTitle = "",
      articleContent = "",
      articleImage = "";

    return { articleTitle, articleContent, articleImage };
  }, []);

  /** HANDLERS **/

  return (
    <Stack>
      <Stack
        direction="row"
        style={{ margin: "40px" }}
        justifyContent="space-evenly"
      >
        <Box
          component={"div"}
          className={"form_row"}
          style={{ width: "300px" }}
        >
          <Typography style={{ color: "#7f838d", margin: "10px" }} variant="h3">
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem>
                <span>Free</span>
              </MenuItem>
              <MenuItem>Humor</MenuItem>
              <MenuItem>News</MenuItem>
              <MenuItem>Recommendation</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          component={"div"}
          style={{ width: "300px", flexDirection: "column" }}
        >
          <Typography style={{ color: "#7f838d", margin: "10px" }} variant="h3">
            Title
          </Typography>
          <TextField
            id="filled-basic"
            label="Type Title"
            style={{ width: "300px", background: "white" }}
          />
        </Box>
      </Stack>

      <Editor
        initialValue={"Type here"}
        placeholder={"Type here"}
        previewStyle={"vertical"}
        height={"640px"}
        // @ts-ignore
        initialEditType={"WYSIWYG"}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        // ref={editorRef}
        // hooks={{
        //   addImageBlobHook: async (image: any, callback: any) => {
        //     const uploadedImageURL = await uploadImage(image);
        //     callback(uploadedImageURL);
        //     return false;
        //   },
        // }}
        events={{
          load: function (param: any) {},
        }}
      />

      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};

export default TuiEditor;
