import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { scheduleTimingMods } from "../../constants/pageStates";
import { setScheduleMod } from "../../redux/actions/app";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px 20px",
    flexDirection: "row",
    flexGrow: 3,
    "& div": {
      margin: "0px 20px",
    },
  },
}));

export function ScheduleBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const scheduleTimingModHandle = (event, newValue) => {
    dispatch(setScheduleMod(newValue));
  };

  return (
    <div className={classes.root}>
      <div className="Timing">Timing</div>
      <Button variant="outlined">Today</Button>
      <ToggleButtonGroup
        value={app.scheduleMod}
        exclusive
        onChange={scheduleTimingModHandle}
      >
        <ToggleButton value={scheduleTimingMods.day}>
          {scheduleTimingMods.day[0]}
        </ToggleButton>
        <ToggleButton value={scheduleTimingMods.week}>
          {scheduleTimingMods.week[0]}
        </ToggleButton>
        <ToggleButton value={scheduleTimingMods.month}>
          {scheduleTimingMods.month[0]}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
