const benchmarks: Record<string, { min: number; max: number }> = {
  fantasy: { min: 90000, max: 140000 },
  thriller: { min: 70000, max: 100000 },
  romance: { min: 60000, max: 90000 },
  scifi: { min: 80000, max: 120000 }
};

export const compareToGenreBenchmark = (genre: string, words: number) => {
  const benchmark = benchmarks[genre.toLowerCase()];
  if (!benchmark) return { inRange: true, note: 'No benchmark available for this genre yet.' };

  if (words < benchmark.min) return { inRange: false, note: `Below typical ${genre} length by ${benchmark.min - words} words.` };
  if (words > benchmark.max) return { inRange: false, note: `Above typical ${genre} length by ${words - benchmark.max} words.` };
  return { inRange: true, note: `Within standard ${genre} range.` };
};
