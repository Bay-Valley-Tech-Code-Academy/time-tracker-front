import TimeTrackerForm from "./time-tracker-form";
import TimeTrackerTable from "./time-tracker-table";
import React, { useState, useEffect } from "react";
import type { TimeEntry } from "./types";

console.log("Here")
const TimeTrackerPage = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  // Fetch entries from backend on first render
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("No token found. User may not be logged in.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/entries", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch entries");
        
        const data = await response.json();

        const entriesWithDates: TimeEntry[] = data.map((entry: any) => {
          const converted = {
            ...entry,
            date: new Date(entry.date),
            startTime: new Date(entry.startTime),
            endTime: new Date(entry.endTime),
          };

          return converted;
      });

      setEntries(entriesWithDates);
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
    };

    fetchEntries();
  }, []);


  // add a new entry from the form
  const handleNewEntry = async (entry: TimeEntry) => {
    // Converts dates to ISO strings for back end POST
    const entryForBackend = {
      ...entry,
      date: entry.date.toISOString(),
      startTime: entry.startTime.toISOString(),
      endTime: entry.endTime.toISOString(),
    };

    console.log("Sending entry to backend:", JSON.stringify(entryForBackend, null, 2));

    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("No token found. User may not be logged in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entryForBackend),
      });

      if (!response.ok) throw new Error("Failed to save entry");

      const savedEntry = await response.json();

      console.log("Saved entry from backend:", savedEntry);

      // Converts back to Date objects for front end
      const savedEntryWithDates: TimeEntry = {
        ...savedEntry,
        date: new Date(savedEntry.date),
        startTime: new Date(savedEntry.startTime),
        endTime: new Date(savedEntry.endTime),
      };

      // Update frontend only after backend confirms
      setEntries(prev => [...prev, savedEntryWithDates]);
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const handleDeleteEntry = async (indexToDelete: number) => {
    const entry = entries[indexToDelete];

    try {

      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("No token found. User may not be logged in.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/entries/${entry._id}`, {
        method: "DELETE",
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });

      if (!response.ok) throw new Error("Failed to delete entry");

      // remove locally if successful
      setEntries(prev => prev.filter((_, idx) => idx !== indexToDelete));
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  return (
    <div className="time-tracker-content">
      <TimeTrackerForm onSubmit={handleNewEntry} />
      <TimeTrackerTable entries={entries} onDelete={handleDeleteEntry} />
    </div>
  );
};

export default TimeTrackerPage;
