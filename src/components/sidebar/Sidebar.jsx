import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Compare, Sort, Menu, Close } from "@mui/icons-material";

// Sample data for the sidebar menu
const menuItems = [
  {
    text: "Visualize",
    icon: <Sort />,
    path: "/",
  },
  {
    text: "Compare",
    icon: <Compare />,
    path: "/compare",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderMenuItem = (item, index) => {
    const isSelected = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;

    const ListItemComponent = (
      <div key={index} className={isSelected ? "bg-blue-200" : ""}>
        <ListItem
          button
          key={index}
          component={hasChildren ? "div" : Link}
          to={hasChildren ? undefined : item.path}
          onClick={hasChildren ? handleClick : undefined}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
      </div>
    );

    if (hasChildren) {
      return (
        <div key={index}>
          {ListItemComponent}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child, childIndex) =>
                renderMenuItem(child, `${index}-${childIndex}`)
              )}
            </List>
          </Collapse>
        </div>
      );
    }

    return ListItemComponent;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemIcon>{open ? <Close /> : <Menu />}</ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItem>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
