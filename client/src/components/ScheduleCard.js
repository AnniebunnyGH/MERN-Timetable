import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    width: "1000px",
    height: "800px",
    position: "relative",
  },
}));

export default function ScheduleCard(date1) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  /*let date = new Date();
  date = date.toISOString().slice(0, 10)
  */
  const date = "2020-09-09";
  console.log(user.userEvents);
  let dayEventComponents = [];
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

    const startTime = calcMinutes(res.start);
    const endTime = calcMinutes("24:00");
    const minutesWidth = endTime - startTime;
    const percentPerMinute = 100 / minutesWidth;

    const cardWidth = 100 / (maxLevel + 1); // %

    dayEventComponents = sortedEvents.map((event, index) => (
      <EventCard
        event={event}
        width={cardWidth + "%"}
        height={percentPerMinute * calcMinutes(event.duration) + "%"}
        left={cardWidth * event.level + "%"}
        top={percentPerMinute * (calcMinutes(event.start) - startTime) + "%"}
        key={index}
      ></EventCard>
    ));
  }

  function calcMinutes(time) {
    // '10:30'
    const t = time.split(":");
    return +t[0] * 60 + +t[1];
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
      start: erliestEventTime,
    };
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={user.userInfo.fname + user.userInfo.sname} />
      <CardContent className={classes.cardContent}>
        {dayEventComponents}
      </CardContent>
    </Card>
  );
}
