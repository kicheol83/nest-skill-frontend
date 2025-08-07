import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";
import { useRouter } from "next/router";

export const MyProviderCard = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const pushEditProperty = async (id: string) => {
    console.log("+pushEditProperty: ", id);
    await router.push({
      pathname: "/mypage",
      query: { category: "addPost", propertyId: id },
    });
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (device === "mobile") {
    return <div>MOBILE PROPERTY CARD</div>;
  } else
    return (
      <Stack className="provider-card-box">
        <Stack className="image-box">
          <img src="/img/banner/d.avif" alt="" />
        </Stack>
        <Stack className="information-box">
          <Typography className="name">The best Photograph</Typography>
          <Typography className="address"></Typography>
          Seoul Ganwon 200-17
          <Typography className="price">
            <strong style={{ color: "green" }}>$200</strong>
          </Typography>
        </Stack>
        <Stack className="date-box">
          <Typography className="date">
            <Moment format="DD MMMM, YYYY">20025.08.07</Moment>
          </Typography>
        </Stack>
        <Stack className="status-box">
          <Stack
            className="coloured-box"
            sx={{ background: "#E5F0FD" }}
            onClick={handleClick}
          >
            <Typography className="status" sx={{ color: "#3554d1" }}>
              ACTIVE
            </Typography>
          </Stack>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: "120px",
              mt: 1,
              ml: -1,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            },
            style: {
              padding: 0,
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <>
            <MenuItem
              disableRipple
              onClick={() => {
                handleClose();
              }}
              sx={{ width: "115px" }}
            >
              DEACTIVATED
            </MenuItem>
          </>
        </Menu>

        <Stack className="views-box">
          <Typography className="views">11</Typography>
        </Stack>
        <Stack className="action-box">
          <IconButton className="icon-button">
            <ModeIcon className="buttons" />
          </IconButton>
          <IconButton className="icon-button">
            <DeleteIcon className="buttons" />
          </IconButton>
        </Stack>
      </Stack>
    );
};
