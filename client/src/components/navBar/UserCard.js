import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export function UserCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();

  const logoutHandle = (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Avatar className={classes.avatar}>{user.fname + user.sname}</Avatar>
        <Typography variant="subtitle1" align="center">
          {user.fname + user.sname}
        </Typography>
        <Typography variant="subtitle2" align="center">
          {auth.userId}
        </Typography>
      </CardContent>
      <Divider />
      <Button size="large" fullWidth>
        Create Event
      </Button>
      <Divider />
      <Button size="large" fullWidth>
        Create Group
      </Button>
      <Divider />
      <CardActions className={classes.cardContent}>
        <Button variant="outlined" onClick={logoutHandle}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}
