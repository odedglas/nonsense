import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Main, DrawerHeader } from "./Main";
import { AppBar } from "./AppBar";
import { AppDrawer } from "./Drawer";
import Canvas from "../canvas";
import artController from "../controller/Art";
import { arts } from "../art";

const App = () => {
  const [activeArtIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const art = arts[activeArtIndex];

  const handleDrawerOpen = () => {
    setOpen(true);
    Canvas.fitCanvas();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    Canvas.fitCanvas();
  };

  useEffect(() => {
    artController.init();
  }, []);

  useEffect(() => {
    artController.start(art);
  }, [activeArtIndex]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {art.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer
        handleDrawerClose={handleDrawerClose}
        arts={arts}
        open={open}
      />
      <Main open={open}>
        <DrawerHeader />
        <canvas id="board" />
      </Main>
    </Box>
  );
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    artController.stop();
  });
}

export default App;
