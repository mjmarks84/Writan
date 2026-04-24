export const CommentThread = ({ author, message }: { author: string; message: string }) => (
  <article className="card">
    <strong>{author}</strong>
    <p style={{ margin: '6px 0 0' }}>{message}</p>
  </article>
);
