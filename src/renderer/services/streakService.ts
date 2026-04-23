export const calculateStreak = (writeDates: string[]): { current: number; longest: number } => {
  const sorted = [...new Set(writeDates)].sort();
  if (!sorted.length) return { current: 0, longest: 0 };

  let longest = 1;
  let running = 1;

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = new Date(sorted[i - 1]);
    const next = new Date(sorted[i]);
    const diff = (next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 1;
    }
  }

  return { current: running, longest };
};
