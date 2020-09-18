import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:(props)=> ({
    width: props.width,
    height: props.height,
    position: 'absolute',
    left: props.left,
    top: props.top,
    backgroundColor: '#0992655b',
    transitionProperty: 'top,left',
    transitionDuration: '0.3s'
  })
}))


export default function EventCard(props) {
  const classes = useStyles(props);
  return (
    <Card className={classes.root}>
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