import {
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const drawerWidth = 240;

const navItems = ["Profile", "Add Deal", "LogOut"];

const LoggedOnNavBar = (props: any) => {
  const { window } = props;

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ my: 2, color: "#fbb002", fontSize: "2rem" }}>
        weDeal
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                if (item === "LogOut") {
                  sessionStorage.clear();
                  navigate("/");
                } else if (item === "Add Deal") {
                  navigate(`/add-deal`);
                } else {
                  navigate(`/${item.toLowerCase()}`);
                }
              }}
            >
              <ListItemText
                primary={item}
                sx={{ color: "#fbb002" }}
                primaryTypographyProps={{
                  fontSize: "1.4rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "#efe0d3",
          }}
        >
          <LocalMallIcon sx={{ mr: 1, color: "#fbb002", fontSize: "2.5rem" }} />
          <Typography
            variant="h2"
            sx={{
              color: "#fbb002",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={() => {
              navigate(`/home`);
            }}
          >
            weDeal
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: "#fbb002" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor="right"
          sx={{
            //   display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default LoggedOnNavBar;
