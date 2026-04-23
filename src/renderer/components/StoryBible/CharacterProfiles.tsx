export function CharacterProfiles() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Character Profiles</h3>
      <input className="w-full rounded border border-slate-300 bg-transparent p-2 text-sm dark:border-slate-600" placeholder="Name" />
      <textarea className="w-full rounded border border-slate-300 bg-transparent p-2 text-sm dark:border-slate-600" placeholder="Role, motivation, traits" />
    </div>
  );
}
