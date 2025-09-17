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
    <div className="time-entries-container space-y-4 bg-[#a1a1a1] p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-center text-black mb-4">Previous Time Entries</h2>

      {entries.map((entry, idx) => (
        <div
          key={idx}
          className="bg-[#FCAE49] border border-gray-400 rounded-lg shadow-md p-4 flex flex-col gap-4"
        >
          {/* Top row: Project & Summary */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 border border-gray-400 rounded-lg text-center">
              <div className="bg-[#FCAE49] font-semibold p-1 rounded-t-lg">Project</div>
              <div className="bg-[#FFCB7D] p-2 rounded-b-lg">{entry.project}</div>
            </div>
            <div className="flex-1 border border-gray-400 rounded-lg text-center">
              <div className="bg-[#FCAE49] font-semibold p-1 rounded-t-lg">Summary</div>
              <div className="bg-[#FFCB7D] p-2 rounded-b-lg">{entry.summary}</div>
            </div>
          </div>

          {/* Bottom row: Date, Start/End, Total Hours, Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 border border-gray-400 rounded-lg text-center">
              <div className="bg-[#FCAE49] font-semibold p-1 rounded-t-lg">Date</div>
              <div className="bg-[#FFCB7D] p-2 rounded-b-lg">{formatDate(entry.date)}</div>
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg text-center">
              <div className="bg-[#FCAE49] font-semibold p-1 rounded-t-lg">Start Time / End Time</div>
              <div className="bg-[#FFCB7D] p-2 rounded-b-lg">
                {formatTime(entry.startTime)} / {formatTime(entry.endTime)}
              </div>
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg text-center">
              <div className="bg-[#FCAE49] font-semibold p-1 rounded-t-lg">Total Hours</div>
              <div className="bg-[#FFCB7D] p-2 rounded-b-lg">{calculateTotalHours(entry.startTime, entry.endTime)}</div>
            </div>

            <div className="flex flex-col gap-2 items-center flex-1">
              <button className="bg-[#FF5531] text-white px-3 py-1 rounded hover:bg-red-600 max-w-[120px]">
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
