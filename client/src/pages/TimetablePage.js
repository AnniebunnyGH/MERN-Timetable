import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import CreateEventCard from "../components/CreateEventCard";
import ScheduleCard from "../components/ScheduleCard";

function TimetablePage() {
  return (
    <div>
      <ScheduleCard></ScheduleCard>
      <CreateEventCard></CreateEventCard>
    </div>
  );
}

export default TimetablePage;

// <ScheduleCard></ScheduleCard>
