import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IconButton, Avatar, Button, Paper, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserCard } from "./UserCard";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1000,
  },
}));

export function UserMenu() {
  const user = useSelector((state) => state.user.userInfo);
  const classes = useStyles();
  const [isMenuOpened, setMenuOpened] = useState(false);
  const userIconBtn = useRef();

  const openMenuHandle = () => {
    setMenuOpened(!isMenuOpened);
  };

  return (
    <div>
      <IconButton
        ref={userIconBtn}
        aria-describedby="userPopper"
        onClick={openMenuHandle}
      >
        <Avatar>{user.fname + user.sname}</Avatar>
      </IconButton>
      <Popper
        className={classes.popper}
        id="userPopper"
        open={isMenuOpened}
        anchorEl={userIconBtn.current}
        placement="bottom-end"
        transition
      >
        <UserCard></UserCard>
      </Popper>
    </div>
  );
}
