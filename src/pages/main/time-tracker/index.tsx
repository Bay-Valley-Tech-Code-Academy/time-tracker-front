import TimeTrackerForm from "./time-tracker-form";
import TimeTrackerTable from "./time-tracker-table";
import React, { useState } from "react";
import type { TimeEntry } from "./types";

const TimeTrackerPage = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  // add a new entry from the form
  const handleNewEntry = (entry: TimeEntry) => {
    setEntries(prevEntries => [...prevEntries, entry]);
  };

  const handleDeleteEntry = (indexToDelete: number) => {
    setEntries(prevEntries => prevEntries.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="time-tracker-content">
      <TimeTrackerForm onSubmit={handleNewEntry} />
      <TimeTrackerTable entries={entries} onDelete={handleDeleteEntry} />
    </div>
  );
};

export default TimeTrackerPage;
