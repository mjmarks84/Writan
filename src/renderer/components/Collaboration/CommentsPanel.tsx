export const CommentsPanel = ({ comments }: { comments: string[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Comments</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>{comments.map((comment, i) => <li key={i}>{comment}</li>)}</ul>
  </section>
);
