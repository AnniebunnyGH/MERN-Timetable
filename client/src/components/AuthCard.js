import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { login} from "../redux/actions/auth";
import { useHttp } from "../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  nameLine: {
    display: "flex",
    "& .MuiTextField-root": {
      maxWidth: "50%",
    },
  },
}));

export default function AuthCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {loading, request, error, clearError}= useHttp();
  const model = {
    login: "log in",
    logon: "log on",
  };

  const [tabValue, setValue] = useState(model.login);
  const loginTabHandler = (event, newValue) => {
    setValue(newValue);
  };

  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
  });
  const [regForm, setRegForm] = useState({
    fname: "",
    sname: "",
    rights: "s",
    groups: [],
  });
  const changeHandler = (event) => {
    if (authForm.hasOwnProperty(event.target.name)) {
      setAuthForm({ ...authForm, [event.target.name]: event.target.value });
    } else {
      setRegForm({ ...regForm, [event.target.name]: event.target.value });
    }
  };

  const registerHandler = async () => {
    try {
      await request("/api/auth/register","POST",{...authForm, ...regForm});
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const res = await request("/api/auth/login","POST",{...authForm});
      dispatch(login(res));
    } catch (e) {}
  };

  return (
    <Card className={classes.root}>
      <Tabs
        value={tabValue}
        selectionFollowsFocus={false}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        onChange={loginTabHandler}
      >
        <Tab label={model.login} value={model.login} />
        <Tab label={model.logon} value={model.logon} />
      </Tabs>
      <CardHeader title="Authorization" />
      <CardContent>
        <form className={classes.form}>
          {tabValue === model.logon && (
            <div className={classes.nameLine}>
              {" "}
              <TextField
                id="fname"
                label="First Name"
                name="fname"
                type="text"
                onChange={changeHandler}
                required
              />
              <TextField
                id="sname"
                label="Second Name"
                name="sname"
                type="text"
                onChange={changeHandler}
                required
              />
            </div>
          )}
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            onChange={changeHandler}
            required
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={changeHandler}
            required
          />
        </form>
        {tabValue === model.login ? (
          <Button onClick={loginHandler}>Log In</Button>
        ) : (
          <Button onClick={registerHandler}>Register</Button>
        )}
      </CardContent>
    </Card>
  );
}
