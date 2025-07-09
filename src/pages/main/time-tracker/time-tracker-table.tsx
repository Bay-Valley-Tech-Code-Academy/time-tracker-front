import React from "react";

const TimeTrackerTable: React.FC = () => {
  return (
    <table className="time-entry-table">
      <thead>
        <tr>
          <th>Summary</th>
          <th>Project</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Made the entry form</td>
          <td>Alpha</td>
          <td>2025-05-21</td>
          <td>09:00 AM</td>
          <td>11:30 AM</td>
          <td>
            <button className="time-tracker-table-action-button">Actions</button>
            <button className="time-tracker-table-delete-button">Delete</button>
          </td>
        </tr>
        <tr>
          <td>Made the table</td>
          <td>Beta</td>
          <td>2025-05-21</td>
          <td>01:00 PM</td>
          <td>04:00 PM</td>
          <td>
            <button className="time-tracker-table-action-button">Actions</button>
            <button className="time-tracker-table-delete-button">Delete</button>
          </td>
        </tr>
        <tr>
          <td>Took a break</td>
          <td>Gamma</td>
          <td>2025-05-21</td>
          <td>04:00 PM</td>
          <td>11:00 PM</td>
          <td>
            <button className="time-tracker-table-action-button">Actions</button>
            <button className="time-tracker-table-delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TimeTrackerTable;
