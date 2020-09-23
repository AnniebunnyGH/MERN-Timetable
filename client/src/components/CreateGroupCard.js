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
import { fetchCreateGroup } from "../redux/actions/creater";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  nameLine: {
    display: "flex",
  },
}));

const CreateGroupCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const creater = useSelector((state) => state.creater);
  const [groupForm, setGroupForm] = useState({
    groupName: "",
    groupTag: "",
    members: [],
    importedGroups: [],
  });
  const [groupMembers, setGroupMembers] = useState([]);
  const [importedGroups, setImportedGroups] = useState([]);

  const changeHandler = (event) => {
    setGroupForm({ ...groupForm, [event.target.name]: event.target.value });
  };

  const createGroupHandler = async () => {
    try {
      dispatch(
        fetchCreateGroup({
          name: groupForm.groupName,
          tag: groupForm.groupTag,
          members: groupMembers.map((elem) => elem._id),
          importedGroups: importedGroups.map((elem) => elem.tag),
        })
      );
    } catch (e) {}
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Create Group" />
      <CardContent>
        <form className={classes.form}>
          <TextField
            id="groupName"
            label="Group name"
            name="groupName"
            type="text"
            onChange={changeHandler}
            required
          />
          <TextField
            id="groupTag"
            label="Group tag"
            name="groupTag"
            type="text"
            onChange={changeHandler}
            required
          />
          <Autocomplete
            multiple
            id="groupMembers"
            value={groupMembers}
            options={creater.users}
            getOptionLabel={(option) => option.sname + " " + option.fname}
            onChange={(event, newValue) => setGroupMembers(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Members" type="text" />
            )}
          />
          <Autocomplete
            multiple
            id="importedGroups"
            value={importedGroups}
            options={creater.groups}
            getOptionLabel={(option) => option.name + " " + option.tag}
            onChange={(event, newValue) => setImportedGroups(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Import members from... "
                type="text"
              />
            )}
          />
          <Button onClick={createGroupHandler}>Create group</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateGroupCard;
