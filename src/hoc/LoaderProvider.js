import React, { useState, createContext } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const LoaderContext = createContext({});

export default function Loader(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = (openState) => {
    setOpen(openState);
  };

  return (
    <LoaderContext.Provider value={handleToggle}>
        {props.children}
        <Backdrop
          className={classes.backdrop}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </LoaderContext.Provider>
  );
}