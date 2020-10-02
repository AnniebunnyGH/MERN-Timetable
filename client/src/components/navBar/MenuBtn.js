import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    width: "20px",
    height: "20px",
    "& .content": {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "&:hover": {
        cursor: "pointer",
        "& div": {
          filter: "opacity(100%)",
        },
      },
      "& div": {
        width: "100%",
        height: "2px",
        background: "black",
        filter: "opacity(40%)",
        transitionProperty: " transform, background, filter",
        transitionDuration: " 0.3s, 0.3s, 0.1s",
        transformOrigin: "top left",
        transform: "none",
      },
      "& .middle": {
        transformOrigin: " center",
      },
      "& .active.top": {
        transform: "rotate(45deg) scaleX(1.3)",
      },
      "& .active.middle": {
        transform: "scale(0)",
      },
      "& .active.bottom": {
        transform: "rotate(-45deg) scaleX(1.3)",
      },
    },
  },
}));

const MenuBtn = React.forwardRef(({ clickHandle, isOpened }, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root} ref={ref} onClick={clickHandle}>
      <div className="content">
        <div className={(isOpened && "active") + " top"}></div>
        <div className={(isOpened && "active") + " middle"}></div>
        <div className={(isOpened && "active") + " bottom"}></div>
      </div>
    </div>
  );
});

export default MenuBtn;
