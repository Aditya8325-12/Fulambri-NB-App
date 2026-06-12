import { Dimensions } from 'react-native';
import { Application, AppStatus, FilterTab } from '../types/Applications';

export const FILTER_TABS: { id: FilterTab; label: string; icon: string }[] = [
  { id: 'All', label: 'All', icon: 'view-grid-outline' },
  { id: 'Applied', label: 'Applied', icon: 'send-outline' },
  { id: 'Under Review', label: 'Reviewing', icon: 'eye-outline' },
  { id: 'Interview Scheduled', label: 'Interview', icon: 'calendar-outline' },
  { id: 'Offer Received', label: 'Offer', icon: 'check-circle-outline' },
  { id: 'Rejected', label: 'Rejected', icon: 'close-circle-outline' },
];
const { width: SCREEN_W } = Dimensions.get('window');

export const STATUS_CONFIG: Record<
  AppStatus,
  { label: string; color: string; bg: string; icon: string }
> = {
  Applied: {
    label: 'Applied',
    color: '#0891B2',
    bg: '#E0F2FE',
    icon: 'send-circle',
  },
  'Under Review': {
    label: 'Under Review',
    color: '#D97706',
    bg: '#FEF3C7',
    icon: 'eye-circle',
  },
  'Interview Scheduled': {
    label: 'Interview',
    color: '#7C3AED',
    bg: '#EDE9FE',
    icon: 'calendar-check',
  },
  Rejected: {
    label: 'Rejected',
    color: '#DC2626',
    bg: '#FEE2E2',
    icon: 'close-circle',
  },
  'Offer Received': {
    label: 'Offer Received',
    color: '#059669',
    bg: '#D1FAE5',
    icon: 'check-circle',
  },
};

// ─── Sample Data ─────────────────────────────────────────────────────────────

export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior React Native Developer',
    company: 'TechNova Inc.',
    location: 'Bangalore, India',
    appliedDate: 'Jun 10, 2026',
    status: 'Interview Scheduled',
    logoIcon: 'code-braces',
    logoColor: '#7C3AED',
    jobType: 'Full-time',
    salary: '₹18–24 LPA',
  },
  {
    id: '2',
    jobTitle: 'Frontend Engineer',
    company: 'Groww',
    location: 'Mumbai, India · Remote',
    appliedDate: 'Jun 8, 2026',
    status: 'Under Review',
    logoIcon: 'chart-line',
    logoColor: '#059669',
    jobType: 'Full-time',
    salary: '₹12–18 LPA',
  },
  {
    id: '3',
    jobTitle: 'Full Stack Developer',
    company: 'Razorpay',
    location: 'Pune, India',
    appliedDate: 'Jun 5, 2026',
    status: 'Applied',
    logoIcon: 'lightning-bolt',
    logoColor: '#0891B2',
    jobType: 'Full-time',
    salary: '₹20–28 LPA',
  },
  {
    id: '4',
    jobTitle: 'UI/UX Designer',
    company: 'Zomato',
    location: 'Delhi, India · Hybrid',
    appliedDate: 'May 30, 2026',
    status: 'Offer Received',
    logoIcon: 'palette',
    logoColor: '#EF4444',
    jobType: 'Full-time',
    salary: '₹10–15 LPA',
  },
  {
    id: '5',
    jobTitle: 'Backend Engineer',
    company: 'Flipkart',
    location: 'Bangalore, India',
    appliedDate: 'May 22, 2026',
    status: 'Rejected',
    logoIcon: 'server',
    logoColor: '#F59E0B',
    jobType: 'Full-time',
    salary: '₹22–30 LPA',
  },
];
