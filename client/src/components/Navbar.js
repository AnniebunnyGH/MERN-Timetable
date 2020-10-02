import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Divider, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { pages } from "../constants/pages";
import { MainMenu } from "./navBar/MainMenu";
import { ScheduleBar } from "./navBar/ScheduleBar";
import { UserMenu } from "./navBar/UserMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const app = useSelector((state) => state.app);
  const auth = useSelector((state) => state.auth);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className="mainMenu">
            {auth.isAuth && <MainMenu></MainMenu>}
            <Typography variant="h5" className={classes.title}>
              Timetable
            </Typography>
          </div>

          {auth.isAuth && app.currentPage === pages.schedule && (
            <ScheduleBar></ScheduleBar>
          )}
          {auth.isAuth && <UserMenu></UserMenu>}
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
};
