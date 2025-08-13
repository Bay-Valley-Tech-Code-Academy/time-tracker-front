import Button from "../../../components/common/button/button";
import React, { useState } from "react";
import type { TimeTrackerFormProps } from "./types";

const TimeTrackerForm: React.FC<TimeTrackerFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    summary: "Fixed summary text",
    project: "alpha",
    date: "2025-05-21",
    startTime: "08:00",
    endTime: "16:00",
  });

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

    onSubmit({
      summary,
      project,
      date: new Date(date),
      startTime: startDateTime,
      endTime: endDateTime,
    });

    setForm({ summary: "", project: "", date: "", startTime: "", endTime: "" });
  };

  return (
    <form className="time-tracker-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="project">Project</label>
        <select
          id="project"
          name="project"
          value={form.project}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select a project</option>
          <option value="alpha">Alpha</option>
          <option value="beta">Beta</option>
          <option value="gamma">Gamma</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <Button type="submit" className="submit-button">
        Submit
      </Button>
    </form>
  );
};

export default TimeTrackerForm;

