export interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  ctc: string;
  employmentType: string;
  experience: string;
  applyBy: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  department: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  benefitsTitle: string;
  skillsRequired: string[];
}
