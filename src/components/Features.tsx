import { features } from "@/lib/data";
import { PixelIcon } from "./PixelIcon";
import { Section } from "./Section";

export function Features() {
  return (
    <Section
      id="features"
      index="01"
      title="Everything a chat client should be"
      lead=""
    >
      <ul className="grid gap-px border rule bg-line sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <li
            key={f.title}
            className={`group flex flex-col gap-4 bg-ink p-6 transition-colors hover:bg-panel ${
              f.span ? "lg:col-span-2" : ""
            }`}
          >
            <PixelIcon rows={f.icon} className="opacity-70 transition-opacity group-hover:opacity-100" />
            <div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog/80">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
