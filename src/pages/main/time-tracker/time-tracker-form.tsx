// Form with 5 fields:
// summary, project (dropdown), date, timestart, timeend, submit button
const TimeTrackerForm = () => {
  return (
    <form className="time-tracker-form">
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          id="summary"
          name="summary"
          defaultValue="Fixed summary text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="project">Project</label>
        <select id="project" name="project" className="form-control" defaultValue="beta">
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
          defaultValue="2025-05-21"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          defaultValue="09:00"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          defaultValue="17:00"
          className="form-control"
        />
      </div>

        {/* Perhaps this should be a common component */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default TimeTrackerForm;