import React from "react";
import type { TimeTrackerTableProps, Project } from "./types";
import axios from "axios";

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
  const [projectMap, setProjectMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User may not be logged in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const map: Record<string, string> = {};
        response.data.forEach((project: Project) => {
          map[project._id] = project.name;
        });
        setProjectMap(map);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);
  
  return (
    <table className="time-entry-table w-full border border-[#A1A1A1] rounded-lg overflow-hidden">
      <thead className="bg-gray-200 text-left">
        <tr>
          <th className="px-4 py-2 border border-[#A1A1A1]">Summary</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">Project</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">Date</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">Start Time</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">End Time</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">Total Hours</th>
          <th className="px-4 py-2 border border-[#A1A1A1]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={idx}>
            <td className="px-4 py-2 border border-[#A1A1A1]">{entry.summary}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">{projectMap[entry.project] || entry.project}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">{formatDate(entry.date)}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">{formatTime(entry.startTime)}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">{formatTime(entry.endTime)}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">{entry.totalHours ?? calculateTotalHours(entry.startTime, entry.endTime)}</td>
            <td className="px-4 py-2 border border-[#A1A1A1]">
              <button className="time-tracker-table-action-button px-3 py-1 rounded bg-[#FF5531] text-white hover:bg-red-600">
                Actions
              </button>
              <button
                className="bg-[#FF5531] text-white px-3 py-1 rounded hover:bg-red-600 max-w-[120px]"
                onClick={() => onDelete(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};




export default TimeTrackerTable;
