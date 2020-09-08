import React, { useContext, } from 'react';
import { Card, CardContent, CardHeader, } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/Auth.context';
import EventCard from './EventCard';

const useStyles = makeStyles((theme) => ({

}))

export default function ScheduleCard(date1) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  /*let date = new Date();
  date = date.toISOString().slice(0, 10)
  */
  const date = '2020-09-04';

  const dayEvents = auth.userData.userEvents.filter((elem) => elem.date.includes(date))
  const dayEventComponents = dayEvents.map((event, index) => <EventCard event={event} key={index}></EventCard>)

  console.log(dayEvents);

  return (
    <Card className={classes.root}>
      <CardHeader title="Schedule" />
      <CardContent>
        {dayEventComponents}
      </CardContent>
    </Card>
  )
}