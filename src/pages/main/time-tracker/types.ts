export interface TimeEntry {
  summary: string;
  project: string;
  date: Date;       
  startTime: Date;  
  endTime: Date;    
  totalHours?: number
}

export interface TimeTrackerFormProps {
  onSubmit: (entry: TimeEntry) => void;
}

export interface TimeTrackerTableProps {
    entries: TimeEntry[];
    onDelete: (index: number) => void;
}
