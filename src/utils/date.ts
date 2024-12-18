import { format } from 'date-fns';

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function getCurrentYearStart(): string {
  return new Date(`${new Date().getFullYear()}-01-01`).toISOString();
}