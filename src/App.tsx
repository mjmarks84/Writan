import { RichTextEditor } from './renderer/components/Editor/RichTextEditor';

const initialContent = `
  <h1>Chapter 1</h1>
  <p>Start writing your story.</p>
  <h2>Scene 1</h2>
  <p>Use the toolbar, outline, and writing stats as you draft.</p>
`;

function App() {
  return <RichTextEditor initialContent={initialContent} />;
}

export default App;
