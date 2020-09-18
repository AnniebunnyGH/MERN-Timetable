import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CreateGroupCard from "../components/CreateGroupCard";
import GroupCard from "../components/GroupCard";

const useStyles = makeStyles((theme) => ({}));

const GroupsPage = ({ groups }) => {
  const classes = useStyles();

  const groupsComponents = [].map((group, index) => (
    <GroupCard group={group} key={index}></GroupCard>
  ));

  return (
    <div>
      {groupsComponents}
      <CreateGroupCard></CreateGroupCard>
    </div>
  );
};

export default GroupsPage;
