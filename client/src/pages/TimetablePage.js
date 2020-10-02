import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Tab } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { pages } from "../constants/pages";
import CreateEventCard from "../components/CreateEventCard";
import ScheduleCard from "../components/ScheduleCard";

import { setPage } from "../redux/actions/app";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: "80px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

function TimetablePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scheduleMods = {
    day: "day",
    week: "week",
    month: "month",
  };
  const [isModMenuOpened, setModMenuOpened] = useState(false);
  const [scheduleMod, setScheduleMod] = useState(scheduleMods.day);

  const scheduleModHandler = (event, newValue) => {
    setModMenuOpened(false);
    setScheduleMod(newValue);
  };

  useEffect(() => {
    dispatch(setPage(pages.schedule));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className="controlPanel">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={scheduleMod}
            onChange={scheduleModHandler}
            className={classes.tabs}
          >
            <Tab label={scheduleMods.day} value={scheduleMods.day} />
            <Tab label={scheduleMods.week} value={scheduleMods.week} />
            <Tab label={scheduleMods.month} value={scheduleMods.month} />
          </Tabs>
        </div>

        <div className="schedule">
          <ScheduleCard></ScheduleCard>
        </div>
        <div>
          <CreateEventCard></CreateEventCard>
        </div>
      </div>
    </div>
  );
}

export default TimetablePage;
