import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Paper, Popper } from "@material-ui/core";
import MenuBtn from "./MenuBtn";
import { pages } from "../../constants/pages";

export function MainMenu() {
  const [isMainMenuOpened, setmainMenuOpened] = useState(false);
  const mainMenuBtn = useRef();

  const mainMenuOpenHandle = () => {
    setmainMenuOpened(!isMainMenuOpened);
  };

  const mainMenuCloseHandle = () => {
    setmainMenuOpened(false);
  };

  return (
    <div>
      <MenuBtn
        ref={mainMenuBtn}
        aria-describedby="mainMenuPopover"
        clickHandle={mainMenuOpenHandle}
        isOpened={isMainMenuOpened}
      ></MenuBtn>
      <Popper
        id="mainMenuPopover"
        open={isMainMenuOpened}
        anchorEl={mainMenuBtn.current}
        onClose={mainMenuCloseHandle}
        placement="bottom-start"
        transition
      >
        <Paper>
          <Button color="inherit" component={NavLink} to={pages.schedule.url}>
            {pages.schedule.name}
          </Button>

          <Button color="inherit" component={NavLink} to={pages.groups.url}>
            {pages.groups.name}
          </Button>
        </Paper>
      </Popper>
    </div>
  );
}
