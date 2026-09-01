const facts = [
  ["No telemetry", "No analytics, no crash reporting, no advertising."],
  ["No servers", "Talks directly to Kick.com, 7TV, and jsDelivr. Messages go straight to Kick."],
  ["No accounts", "Your session stays in a local file on your machine."],
];

export function Trust() {
  return (
    <section className="border-b rule bg-ink-2" aria-label="Privacy facts">
      <ul className="mx-auto grid max-w-6xl gap-px border-x rule bg-line sm:grid-cols-3">
        {facts.map(([t, b]) => (
          <li key={t} className="bg-ink-2 px-6 py-7">
            <h3 className="font-semibold text-mint">{t}</h3>
            <p className="mt-1.5 text-sm text-fog/80">{b}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
