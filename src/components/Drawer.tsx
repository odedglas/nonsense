import React from "react";
import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "./constants";
import { DrawerHeader } from "./Main";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import MouseIcon from '@mui/icons-material/Mouse';
import ListItemText from "@mui/material/ListItemText";
import { ArtItem } from "../art/interface";
import { ART_TITLE } from "../art/constants";

const artsIconMap = {
  [ART_TITLE.PARTICLE_TEXT]: FormatShapesIcon,
  [ART_TITLE.MOUSE_TRACKER]: MouseIcon,
};

interface DrawerProps {
  open: boolean;
  arts: ArtItem[];
  handleDrawerClose: () => void;
  onItemClick: (art: ArtItem) => void;
}

export const AppDrawer: React.FC<DrawerProps> = ({
  open,
  handleDrawerClose,
  arts,
  onItemClick,
}) => (
  <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </DrawerHeader>
    <Divider />
    {arts.map((art) => {
      const Icon = artsIconMap[art.title] || FormatShapesIcon;

      return (
        <ListItem button key={art.title} onClick={() => onItemClick(art)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={art.title} />
        </ListItem>
      );
    })}
  </Drawer>
);
