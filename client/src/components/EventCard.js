import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const styleConst = {
  cardMargin: 5, //px
};

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    margin: styleConst.cardMargin,
    width: `calc(${props.width}% - ${2 * styleConst.cardMargin}px)`,
    height: `calc(${props.height}% - ${2 * styleConst.cardMargin}px)`,
    position: "absolute",
    left: `calc(${props.left}% - ${styleConst.cardMargin}px)`,
    top: `calc(${props.top}% - ${styleConst.cardMargin}px)`,
    backgroundColor: "ingerit",
    transitionProperty: "top,left",
    transitionDuration: "0.3s",
  }),
  cardContent: {
    height: "100%",
    backgroundColor: "#3379a82f",
  },
}));

export default function EventCard(props) {
  const classes = useStyles(props);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" align="center">
          {props.event.name}
        </Typography>
        <Typography align="center">{props.event.host}</Typography>
        <Typography variant="body1" align="center">
          {props.event.start}
        </Typography>
      </CardContent>
    </Card>
  );
}
