import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}))


export default function EventCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' align='center' 	>
          {props.event.name}
        </Typography>
        <Typography align='center' 	>
          {props.event.host}
        </Typography>
        <Typography variant='body1' align='center' 	>
          {props.event.start}
        </Typography>
      </CardContent>
    </Card>
  )
}