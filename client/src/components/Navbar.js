import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { AppBar, Toolbar, Typography, Button, BottomNavigation } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title} >Timetable</Typography>
          {auth.isAuth &&
            <div>
              <Button color="inherit" component={NavLink} to="/timetable">Timetable</Button>
              <Button color="inherit" component={NavLink} to='/groups'>Groups</Button>
              <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </div>
          }
        </Toolbar>
      </AppBar>


    </div>)
}