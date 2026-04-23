export const PluginSettings = ({ pluginId }: { pluginId: string }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Plugin Settings</h3>
    <p style={{ margin: 0 }}>Configure plugin: {pluginId}</p>
  </section>
);
