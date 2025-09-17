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

    <form
      className="time-tracker-form bg-[#FFFFD9] p-6 rounded-lg shadow-md space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="form-group flex flex-col">
        <label htmlFor="summary" className="mb-1 font-semibold text-[#FCAE49]">
          Summary
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="form-control border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
        />
      </div>

      <div className="form-group flex flex-col">
        <label htmlFor="project" className="mb-1 font-semibold text-[#FCAE49]">
          Project
        </label>
        <select
          id="project"
          name="project"
          value={form.project}
          onChange={handleChange}
          className="form-control border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
          disabled={loading}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        {loading && <p className="text-sm text-gray-500">Loading projects...</p>}
        {!loading && projects.length === 0 && (
          <p className="text-sm text-red-500">No projects available. Please create a project first.</p>
        )}
      </div>

      <div className="form-group flex flex-col">
        <label htmlFor="date" className="mb-1 font-semibold text-[#FCAE49]">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="form-control border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
        />
      </div>

      <div className="form-group flex flex-col">
        <label htmlFor="startTime" className="mb-1 font-semibold text-[#FCAE49]">
          Start Time
        </label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="form-control border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
        />
      </div>

      <div className="form-group flex flex-col">
        <label htmlFor="endTime" className="mb-1 font-semibold text-[#FCAE49]">
          End Time
        </label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="form-control border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FCAE49]"
        />
      </div>

      <Button
        type="submit"
        className="submit-button bg-[#FF5531] text-white font-bold py-2 px-4 rounded hover:bg-[#e04a27]"
      >
        Submit
      </Button>
    </form>
  );
};

export default TimeTrackerForm;

