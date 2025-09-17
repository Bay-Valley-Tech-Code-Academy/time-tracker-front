export interface TimeEntry {
    _id?: string;
    summary: string;
    project: string;
    date: Date;       
    startTime: Date;  
    endTime: Date;    
    totalHours?: number
    userID?: string;
}

export interface TimeTrackerFormProps {
  onSubmit: (entry: TimeEntry) => void;
}

export interface TimeTrackerTableProps {
    entries: TimeEntry[];
    onDelete: (index: number) => void;
}

export interface Project {
  _id: string;
  name: string;
}