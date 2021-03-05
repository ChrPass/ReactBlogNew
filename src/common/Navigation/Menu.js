import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/Home" label="HOME" />
      <BottomNavigationAction component={Link} to="/Home" label="LIFE STYLE" />
      <BottomNavigationAction component={Link} to="/Home" label="TRAVEL" />
      <BottomNavigationAction component={Link} to="/Home" label="FASHION" />
      <BottomNavigationAction component={Link} to="/Home" label="GALLARY" />
      <BottomNavigationAction component={Link} to="/Home" label="CONTACT" />
    </BottomNavigation>
  );
}
