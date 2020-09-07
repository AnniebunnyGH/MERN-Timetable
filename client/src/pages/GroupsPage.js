import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateEventCard from '../components/CreateEventCard';
import CreateGroupCard from '../components/CreateGroupCard';
import { AuthContext } from '../context/Auth.context';

const useStyles = makeStyles((theme) => ({

}));

export default function GroupsPage() {
  const auth = useContext(AuthContext);
  const classes = useStyles();



  return (
    <div>
      <CreateGroupCard></CreateGroupCard>

    </div>
  );
}
