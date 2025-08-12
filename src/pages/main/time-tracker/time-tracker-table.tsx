import React from "react";
import type { TimeTrackerTableProps } from "./types";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const calculateTotalHours = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime(); //calculates in milliseconds
  return Number((diffMs / (1000 * 60 * 60)).toFixed(2)); //round to hours, convert to number
};


const TimeTrackerTable: React.FC<TimeTrackerTableProps> = ({ entries, onDelete }) => {
  return (
    <table className="time-entry-table">
      <thead>
        <tr>
          <th>Summary</th>
          <th>Project</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.summary}</td>
            <td>{entry.project}</td>
            <td>{formatDate(entry.date)}</td>
            <td>{formatTime(entry.startTime)}</td>
            <td>{formatTime(entry.endTime)}</td>
            <td>{calculateTotalHours(entry.startTime, entry.endTime)}</td>
            <td>
              <button className="time-tracker-table-action-button">
                Actions
              </button>
              <button className="time-tracker-table-delete-button" onClick={() => onDelete(idx)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};




export default TimeTrackerTable;
