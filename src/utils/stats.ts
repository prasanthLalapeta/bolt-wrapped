import { Commit, Collaborator, LanguageStats } from '../types/github';

export function calculatePeakDay(commits: Commit[]): string {
  const commitsByDay = commits.reduce((acc, commit) => {
    const date = commit.commit.author.date.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(commitsByDay)
    .sort(([, a], [, b]) => b - a)[0][0];
}

export function processCollaborators(collaborators: Collaborator[]): Collaborator[] {
  return collaborators
    .reduce((acc: Collaborator[], curr) => {
      const existing = acc.find(c => c.login === curr.login);
      if (existing) {
        existing.contributions += curr.contributions;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [])
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 3);
}

export function processLanguages(languages: LanguageStats): { name: string; value: number }[] {
  const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
  
  return Object.entries(languages)
    .map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}