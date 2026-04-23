export const InstalledPlugins = ({ pluginIds }: { pluginIds: string[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Installed Plugins</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>{pluginIds.map((id) => <li key={id}>{id}</li>)}</ul>
  </section>
);
