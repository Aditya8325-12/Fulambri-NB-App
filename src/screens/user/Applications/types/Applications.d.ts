export type AppStatus =
  | 'Applied'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Rejected'
  | 'Offer Received';

export type FilterTab = 'All' | AppStatus;

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: AppStatus;
  logoIcon: string;
  logoColor: string;
  jobType: string;
  salary: string;
}
