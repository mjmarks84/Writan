export const calculateStreak = (writeDates: string[]): { current: number; longest: number } => {
  const toDayStart = (value: string) => {
    const day = new Date(value);
    day.setHours(0, 0, 0, 0);
    return day;
  };
  const dayDiff = (left: Date, right: Date) => (right.getTime() - left.getTime()) / (1000 * 60 * 60 * 24);
  const sorted = [...new Set(writeDates)].sort((a, b) => toDayStart(a).getTime() - toDayStart(b).getTime());
  if (!sorted.length) return { current: 0, longest: 0 };

  let longest = 1;
  let running = 1;

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = toDayStart(sorted[i - 1]);
    const next = toDayStart(sorted[i]);
    const diff = dayDiff(prev, next);

    if (diff === 1) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 1;
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const latest = toDayStart(sorted[sorted.length - 1]);

  let current = 0;
  if (latest.getTime() === today.getTime() || latest.getTime() === yesterday.getTime()) {
    current = 1;
    for (let i = sorted.length - 1; i > 0; i -= 1) {
      const prev = toDayStart(sorted[i - 1]);
      const next = toDayStart(sorted[i]);
      if (dayDiff(prev, next) === 1) {
        current += 1;
      } else {
        break;
      }
    }
  }

  return { current, longest };
};
