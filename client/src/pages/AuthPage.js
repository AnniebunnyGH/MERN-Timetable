import React from "react";
import AuthCard from "../components/AuthCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
  },
}));

export default function AuthPage() {
  const classes = useStyles();

  return <AuthCard className={classes.root}></AuthCard>;
}
