import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import EventCard from "./EventCard";
import { calcMinutes } from "../services/timeConverting";
import { Background } from "./scheduleComponents/Background";

export const styleConst = {
  labelWidth: "50px",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    height: "500px",
    position: "relative",
  },
  cardContent: {
    Width: "90%",
    height: "80%",
    position: "relative",
  },
  eventsHeader: {
    width: "100%",
    height: "20px",
    display: "flex",
    alignItems: "center",
    "& .gmtLabel": { width: styleConst.labelWidth },
    "& .list": {
      width: `calc(100% - ${styleConst.labelWidth})`,
      display: "flex",
      justifyContent: "space-around",
    },
  },
  eventsContent: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "scroll",
  },
  content: {
    width: `calc(100% - ${styleConst.labelWidth})`,
    height: "100%",
    position: "relative",
    zIndex: "10",
    left: styleConst.labelWidth,
  },
}));

export default function ScheduleCard(date1) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  let startTime = 0;
  let endTime = 1440;
  let dayEventComponents = [];

  /*let date = new Date();
  date = date.toISOString().slice(0, 10)
  */
  const date = "2020-09-09";

  if (user.userEvents[0]) {
    const dayEvents = user.userEvents.filter((elem) => {
      if (elem.date) {
        return elem.date.includes(date);
      }
      return false;
    });
    const res = sortEvents(dayEvents);
    const sortedEvents = res.arr;
    const maxLevel = res.level;

    startTime = calcMinutes(res.start);
    endTime = calcMinutes("24:00");
    const minutesWidth = endTime - startTime;
    const percentPerMinute = 100 / minutesWidth;

    const cardWidth = 100 / (maxLevel + 1); // %

    dayEventComponents = sortedEvents.map((event, index) => (
      <EventCard
        event={event}
        width={cardWidth} //%
        height={percentPerMinute * calcMinutes(event.duration)} //%
        left={cardWidth * event.level} //%
        top={percentPerMinute * (calcMinutes(event.start) - startTime)} //%
        key={index}
      ></EventCard>
    ));
  }

  function sortEvents(dayEvents) {
    function checkCrossing(a, b) {
      const ast = calcMinutes(a.start);
      const adur = calcMinutes(a.duration);
      const aend = ast + adur;

      const bst = calcMinutes(b.start);
      const bdur = calcMinutes(b.duration);
      const bend = bst + bdur;

      if (
        (aend > bst && aend <= bend) ||
        (ast >= bst && ast < bend) ||
        (bst >= ast && bst < aend) ||
        (bend > ast && bend <= aend)
      ) {
        return true;
      }
      return false;
    }

    let eventArr = dayEvents.sort(
      (a, b) => calcMinutes(a.start) - calcMinutes(b.start)
    );
    const erliestEventTime = eventArr[0].start;

    let eventLevelArr = [eventArr];
    for (let i = 0; i <= eventLevelArr.length; i += 1) {
      if (eventLevelArr[i].length >= 2) {
        eventLevelArr[i + 1] = [];
        for (let j = 0; j < eventLevelArr[i].length - 1; j += 1) {
          function abc() {
            if (checkCrossing(eventLevelArr[i][j], eventLevelArr[i][j + 1])) {
              eventLevelArr[i + 1].push(eventLevelArr[i][j + 1]);
              eventLevelArr[i].splice(j + 1, 1);
              if (j < eventLevelArr[i].length - 1) {
                abc();
              }
            }
          }
          abc();
        }
      } else {
        break;
      }
    }

    let res = [];
    eventLevelArr.forEach((evLevel, level) =>
      evLevel.forEach((event) => {
        event.level = level;
        res.push(event);
      })
    );
    return {
      arr: res,
      level: eventLevelArr.length - 1,
      start: erliestEventTime.slice(0, 2) + ":00",
    };
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={user.userInfo.fname + user.userInfo.sname} />

      <CardContent className={classes.cardContent}>
        <div className={classes.eventsHeader}>
          <div className="gmtLabel">GMT</div>
          <Divider orientation="vertical"></Divider>
          <List className="list">
            <ListItem>
              <ListItemText primary="1" />
            </ListItem>
            <Divider orientation="vertical" />
            <ListItem>
              <ListItemText primary="2" />
            </ListItem>
            <Divider orientation="vertical"></Divider>
            <ListItem>
              <ListItemText primary="3" />
            </ListItem>
            <Divider orientation="vertical"></Divider>
            <ListItem>
              <ListItemText primary="4" />
            </ListItem>
            <Divider orientation="vertical"></Divider>
          </List>
        </div>

        <Divider />
        <div className={classes.eventsContent}>
          <Background startTime={startTime} endTime={endTime}></Background>
          <div className={classes.content}>{dayEventComponents}</div>
        </div>
      </CardContent>
    </Card>
  );
}
