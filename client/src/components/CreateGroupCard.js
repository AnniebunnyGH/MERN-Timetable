import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth.context';
import { useHttp } from '../hooks/http.hook';
import { Button, Card, CardContent, CardHeader, TextField } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  nameLine: {
    display: 'flex',

  }
}));

export default function CreateGroupCard() {
  const { loading, request, error, clearError } = useHttp();
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  const [groupForm, setGroupForm] = useState({
    groupName: '',
    groupTag: '',
    members: [],
    importedGroups: [],
  })
  const [groupMembers, setGroupMembers] = useState([])
  const [importedGroups, setImportedGroups] = useState([]);
  const [creatorData, setCreatorData] = useState({ users: [], groups: [] });

  useEffect(() => {
    async function getCreatorData() {
      try {
        const data = await request('/api/creater/getData', 'GET',
          null,
          { 'Authorization': 'Basic' + ' ' + token, });
        console.log(data);
        setCreatorData(data);
      } catch (e) {

      }
    }
    getCreatorData();
  }, [])


  const changeHandler = event => {
    setGroupForm({ ...groupForm, [event.target.name]: event.target.value })
  };

  const createGroupHandler = async () => {
    try {
      const data = await request('/api/creater/createGroup', 'POST',
        { name: groupForm.groupName,
          tag: groupForm.groupTag,
          members: groupMembers.map((elem)=>elem._id),
          importedGroups: importedGroups.map((elem)=>elem.tag) },
        { 'Authorization': 'Basic' + ' ' + token })
    } catch (e) {

    }
  };


  return (
    <Card className={classes.root}>
      <CardHeader title="Create Group" />
      <CardContent>
        <form className={classes.form} >
          <TextField
            id="groupName"
            label="Group name"
            name='groupName'
            type='text'
            onChange={changeHandler}
            required />
          <TextField
            id="groupTag"
            label="Group tag"
            name='groupTag'
            type='text'
            onChange={changeHandler}
            required />
          <Autocomplete
            multiple
            id="groupMembers"
            value={groupMembers}
            options={creatorData.users}
            getOptionLabel={(option) => option.sname + ' ' + option.fname}
            onChange={(event, newValue) => setGroupMembers(newValue)}
            renderInput={(params) => <TextField {...params} label="Members"
              type='text' />}
          />
          <Autocomplete
            multiple
            id="importedGroups"
            value={importedGroups}
            options={creatorData.groups}
            getOptionLabel={(option) => option.name + ' ' + option.tag}
            onChange={(event, newValue) => setImportedGroups(newValue)}
            renderInput={(params) => <TextField {...params} label="Import members from... "
              type='text' />}
          />
        </form>
        <Button onClick={createGroupHandler}>Create group</Button>
      </CardContent>
    </Card>
  )
}
