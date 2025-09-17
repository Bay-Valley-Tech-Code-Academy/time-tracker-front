import Button from "../../../components/common/button/button";
import React, { useState } from "react";
import type { TimeTrackerFormProps, Project } from "./types";
import axios from "axios";

const TimeTrackerForm: React.FC<TimeTrackerFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    summary: "Fixed summary text",
    project: "",
    date: "2025-05-21",
    startTime: "08:00",
    endTime: "16:00",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
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

        setProjects(response.data);

        if (response.data.length > 0) {
          setForm(prev => ({ ...prev, project: response.data[0]._id }));
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { summary, project, date, startTime, endTime } = form;

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time");
      return;
    }

    const diffMs = endDateTime.getTime() - startDateTime.getTime();
    const totalHours = Number((diffMs / (1000 * 60 * 60)).toFixed(2));

    onSubmit({
      summary,
      project,
      date: new Date(date),
      startTime: startDateTime,
      endTime: endDateTime,
      totalHours,
    });

    setForm({ summary: "", project: "", date: "", startTime: "", endTime: "" });
  };

  return (
    <div className="time-tracker-container bg-[#a1a1a1] p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center text-black mb-4">
        Create New Time Entry
      </h2>

      {/* Form Card */}
      <div className="bg-[#FCAE49] border border-gray-400 rounded-lg shadow-md p-6 space-y-4">
        {/* Summary */}
        <div className="border border-gray-400 rounded-lg text-center">
          <div className="bg-[#FFCB7D] font-semibold p-1 rounded-t-lg">Summary</div>
          <div className="bg-[#FCAE49] p-2 rounded-b-lg flex justify-center">
            <input
              type="text"
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="w-full text-center border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
            />
          </div>
        </div>

        {/* Project */}
        <div className="border border-gray-400 rounded-lg text-center">
          <div className="bg-[#FFCB7D] font-semibold p-1 rounded-t-lg">Project</div>
          <div className="bg-[#FCAE49] p-2 rounded-b-lg flex justify-center">
            <select
              id="project"
              name="project"
              value={form.project}
              onChange={handleChange}
              className="w-full text-center border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
              disabled={loading}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          {loading && <p className="text-sm text-gray-500 mt-1 text-center">Loading projects...</p>}
          {!loading && projects.length === 0 && (
            <p className="text-sm text-red-500 mt-1 text-center">
              No projects available. Please create a project first.
            </p>
          )}
        </div>

        {/* Date */}
        <div className="border border-gray-400 rounded-lg text-center">
          <div className="bg-[#FFCB7D] font-semibold p-1 rounded-t-lg">Date</div>
          <div className="bg-[#FCAE49] p-2 rounded-b-lg flex justify-center">
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full text-center border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
            />
          </div>
        </div>

        {/* Start Time */}
        <div className="border border-gray-400 rounded-lg text-center">
          <div className="bg-[#FFCB7D] font-semibold p-1 rounded-t-lg">Start Time</div>
          <div className="bg-[#FCAE49] p-2 rounded-b-lg flex justify-center">
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full text-center border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="border border-gray-400 rounded-lg text-center">
          <div className="bg-[#FFCB7D] font-semibold p-1 rounded-t-lg">End Time</div>
          <div className="bg-[#FCAE49] p-2 rounded-b-lg flex justify-center">
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full text-center border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="submit-button bg-[#FF5531] text-white font-bold py-2 px-4 rounded hover:bg-[#e04a27]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerForm;

