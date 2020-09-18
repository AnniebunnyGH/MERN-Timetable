import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:(props)=> ({

  })
}))

export default function GroupCard(props) {
  const classes = useStyles(props);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h6' align='center' 	>
          {props.group.name}
        </Typography>
      </CardContent>
    </Card>
  )
}