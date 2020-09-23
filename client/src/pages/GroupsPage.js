import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CreateGroupCard from "../components/CreateGroupCard";
import GroupCard from "../components/GroupCard";

const useStyles = makeStyles((theme) => ({}));

const GroupsPage = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const groups = user.userGroups;

  const tabsModel = {
    joined: "Joined",
    created: "Created",
  };

  const [tabValue, setValue] = useState(tabsModel.joined);

  let joinedGroupsCards = [];
  let createdGroupsCards = [];
  if (groups.joined[0] !== null) {
    joinedGroupsCards = groups.joined.map((group) => (
      <GroupCard group={group} key={group.tag}></GroupCard>
    ));
  }

  if (groups.created[0] !== null) {
    createdGroupsCards = groups.created.map((group) => (
      <GroupCard group={group} key={group.tag}></GroupCard>
    ));
  }

  const tabsHandler = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        selectionFollowsFocus={false}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        onChange={tabsHandler}
      >
        <Tab label={tabsModel.joined} value={tabsModel.joined} />
        <Tab label={tabsModel.created} value={tabsModel.created} />
      </Tabs>
      {tabValue === tabsModel.joined ? (
        <div>{joinedGroupsCards}</div>
      ) : (
        <div>{createdGroupsCards}</div>
      )}
      <CreateGroupCard></CreateGroupCard>
    </div>
  );
};

export default GroupsPage;
