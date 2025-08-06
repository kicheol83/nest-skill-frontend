import {
  Box,
  Typography,
  Avatar,
  Card,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";

const MyOrder = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleStatusClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  return (
    <Box className="order-box">
      {/* Navbar */}
      <Box className="order-navbar">
        <Typography className="order-title">Service Orders</Typography>
        <Box className="order-info">
          <Typography className="order-price">
            Total:{" "}
            <span style={{ color: "green", marginLeft: "10px" }}>$240</span>
          </Typography>
          <Typography className="order-updated">Updated: 2025-08-06</Typography>
        </Box>
      </Box>

      {/* Order Cards */}
      <Box className="order-list">
        {[1, 2].map((orderId) => (
          <Card key={orderId} className="order-card">
            <Avatar
              src="/img/banner/d.avif"
              alt="product"
              className="order-avatar"
            />
            <Box className="order-details">
              <Typography className="order-type">Cleaning</Typography>
              <Typography className="order-product-title">
                Kitchen Deep Clean
              </Typography>
              <Typography className="order-time">
                Ordered at 12:45 PM
              </Typography>
              <Typography className="order-price-card">
                Order price:{" "}
                <span style={{ color: "green", marginLeft: "20px" }}>$120</span>
              </Typography>
            </Box>

            {/* Status Button with Menu */}
            <Box className="order-actions">
              <Button
                variant="contained"
                className="status-btn"
                endIcon={<ArrowDropDown />}
                onClick={(e) => handleStatusClick(e, orderId)}
              >
                Pending
              </Button>
              <IconButton className="delete-btn">
                <Delete />
              </IconButton>
            </Box>

            {/* Status Menu */}
            {/* {selectedOrderId === orderId && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="status-menu"
                sx={{ order: "2" }}
              >
                <MenuItem onClick={handleMenuClose}>Pending</MenuItem>
                <MenuItem onClick={handleMenuClose}>In Progress</MenuItem>
                <MenuItem onClick={handleMenuClose}>Completed</MenuItem>
              </Menu>
            )} */}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyOrder;
