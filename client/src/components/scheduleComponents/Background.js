import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { timeNumbToStr } from "../../services/timeConverting";
import { styleConst } from "../ScheduleCard";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
  },
  labels: {
    width: styleConst.labelWidth,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lines: {
    width: `calc(100% - ${styleConst.labelWidth})`,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .line": {
      width: "100%",
      content: "",
      borderBottom: "#dadce0 1px solid",
    },
  },
  vlines: {
    width: `calc(100% - ${styleConst.labelWidth})`,
    height: "100%",
    position: "absolute",
    left: styleConst.labelWidth,
    display: "flex",
    justifyContent: "space-evenly",
    "& .line": {
      height: "100%",
      content: "",
      borderLeft: "#dadce0 1px solid",
    },
  },
}));

export const Background = ({ startTime, endTime }) => {
  const classes = useStyles();
  let labelList = [];
  let labelComponentList = [];
  let linesComponentList = [];
  const labelCount = Math.ceil((endTime - startTime) / 60);

  for (let i = 0; i <= labelCount; i += 1) {
    const label = timeNumbToStr(startTime + 60 * i);
    labelList.push(label);
  }

  labelComponentList = labelList.map((label, index) => (
    <div className="timeLabel" key={index}>
      <span className="timeLabel text">{label}</span>
    </div>
  ));

  linesComponentList = labelList.map((label, index) => (
    <div className="line" key={index}></div>
  ));

  const vlinesComponentList = ["", "", ""].map((elem, index) => (
    <div className="line" key={index}></div>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.labels}>{labelComponentList}</div>
      <Divider orientation="vertical" />
      <div className={classes.lines}>{linesComponentList}</div>
      <div className={classes.vlines}>{vlinesComponentList}</div>
    </div>
  );
};
