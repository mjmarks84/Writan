import { analyzeStyle } from '../../services/styleAnalysisService';

export const StyleAnalytics = ({ text }: { text: string }) => {
  const style = analyzeStyle(text);
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Style Analytics</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li>Avg sentence length: {style.averageSentenceLength}</li>
        <li>Avg paragraph length: {style.averageParagraphLength}</li>
        <li>Dialogue: {style.dialoguePercentage}%</li>
        <li>Description: {style.descriptionRatio}%</li>
        <li>Passive voice: {style.passiveVoiceRatio}%</li>
      </ul>
    </section>
  );
};
