import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addEvent, fetchCreateEvent } from "../redux/actions/creater";
import { useHttp } from "../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  nameLine: {
    display: "flex",
  },
}));

export default function CreateEventCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const creater = useSelector((state) => state.creater);
  const { loading, request, error, clearError } = useHttp();

  const [eventForm, setEventForm] = useState({
    eventName: "",
    eventStartTime: "10:30",
    eventDuration: "01:30",
    eventGroups: "",
  });
  const [eventDate, setEventDate] = useState(new Date());
  const [eventHost, setEventHost] = useState([]);
  const [eventGroups, setEventGroups] = useState([]);

  const changeHandler = (event) => {
    setEventForm({ ...eventForm, [event.target.name]: event.target.value });
  };

  const createEventHandler = async () => {
    try {
      const res = await request("/api/creater/createEvent", "POST", {
        ...eventForm,
        eventDate,
        eventHost,
        eventGroups: eventGroups.map((elem) => elem.tag),
      });
      dispatch(addEvent(res));
    } catch (e) {}
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Create Event" />
      <CardContent>
        <form className={classes.form}>
          <TextField
            id="eventName"
            label="Event name"
            name="eventName"
            type="text"
            onChange={changeHandler}
            required
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              margin="normal"
              name="eventDate"
              value={eventDate}
              onChange={setEventDate}
            />
          </MuiPickersUtilsProvider>

          <div className={classes.nameLine}>
            <TextField
              margin="normal"
              id="eventStartDate"
              label="Starting date"
              name="eventStartTime"
              type="time"
              defaultValue={eventForm.eventStartTime}
              onChange={changeHandler}
              required
            />
            <TextField
              margin="normal"
              id="eventTiming"
              label="Timing"
              name="eventDuration"
              type="time"
              defaultValue={eventForm.eventDuration}
              onChange={changeHandler}
              required
            />
          </div>

          <Autocomplete
            id="eventHost"
            value={eventHost}
            options={creater.users}
            getOptionLabel={(option) => option.sname + " " + option.fname}
            onChange={(event, newValue) => setEventHost(newValue)}
            freeSolo={true}
            renderInput={(params) => (
              <TextField {...params} label="Lead" type="text" required />
            )}
          />
          <Autocomplete
            multiple
            id="eventGroups"
            value={eventGroups}
            options={creater.groups}
            getOptionLabel={(option) => option.tag + " " + option.name}
            onChange={(event, newValue) => setEventGroups(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Groups" type="text" required />
            )}
          />
        </form>
        <Button onClick={createEventHandler}>Create event</Button>
      </CardContent>
    </Card>
  );
}
