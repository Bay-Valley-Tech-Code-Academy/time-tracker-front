
import TimeTrackerForm from "./time-tracker-form";
import TimeTrackerTable from "./time-tracker-table";


const TimeTrackerPage = () => {
  return (
    <div className="time-tracker-content">
      <TimeTrackerForm />
      <TimeTrackerTable />
    </div>
  );
};

export default TimeTrackerPage;
