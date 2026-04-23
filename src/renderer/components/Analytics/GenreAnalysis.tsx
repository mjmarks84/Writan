import { compareToGenreBenchmark } from '../../services/genreBenchmarkService';

export const GenreAnalysis = ({ genre, words }: { genre: string; words: number }) => {
  const result = compareToGenreBenchmark(genre, words);
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Genre Analysis</h3>
      <p style={{ marginBottom: 0 }}>{result.note}</p>
    </section>
  );
};
