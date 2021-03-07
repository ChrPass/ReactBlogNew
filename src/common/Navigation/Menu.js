import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const navPaths = ["/Home", "/Beginners", "/WebDev"];

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={location.pathname === navPaths[value] ? value : null}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/Home" label="HOME" />
      <BottomNavigationAction component={Link} to="/Beginners" label="For Beginners" />
      <BottomNavigationAction component={Link} to="/WebDev" label="Web Development" />
    </BottomNavigation>
  );
}
