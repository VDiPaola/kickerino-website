import type { ReactNode } from "react";
import { chatterPoints, moderatorPoints, streamerPoints, type RolePoint } from "@/lib/data";
import { ChatterDemo } from "./ChatterDemo";
import { ModDemo } from "./ModDemo";
import { PixelIcon } from "./PixelIcon";
import { Section } from "./Section";
import { StreamerDemo } from "./StreamerDemo";

type RoleSectionProps = {
  id: string;
  index: string;
  title: ReactNode;
  lead: string;
  points: RolePoint[];
  flip?: boolean;
  className?: string;
  children: ReactNode;
};

function RoleSection({ id, index, title, lead, points, flip = false, className, children }: RoleSectionProps) {
  return (
    <Section id={id} index={index} title={title} lead={lead} className={className}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <ul className={`divide-y divide-line border-y rule ${flip ? "lg:order-last" : ""}`}>
          {points.map((p) => (
            <li key={p.title} className="flex gap-4 py-5">
              <PixelIcon rows={p.icon} className="mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fog/80">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="min-w-0">{children}</div>
      </div>
    </Section>
  );
}

export function Chatters() {
  return (
    <RoleSection
      id="chatters"
      index="02"
      title={
        <>
          Everything Kick has.
          <br />
          <span className="text-mint">Plus what it hides.</span>
        </>
      }
      lead="Native Kick chat features, with 7TV, rewards and moderation visibility on top."
      points={chatterPoints}
    >
      <ChatterDemo />
    </RoleSection>
  );
}

export function Moderators() {
  return (
    <RoleSection
      id="moderators"
      index="03"
      title={
        <>
          Moderate faster,
          <br />
          <span className="text-mint">with more context.</span>
        </>
      }
      lead="One click actions, user history and every command, inline with chat. Try the buttons."
      points={moderatorPoints}
      flip
      className="bg-ink-2"
    >
      <ModDemo />
    </RoleSection>
  );
}

export function Streamers() {
  return (
    <RoleSection
      id="streamers"
      index="04"
      title={
        <>
          Run your channel
          <br />
          <span className="text-mint">from chat.</span>
        </>
      }
      lead="Title, category and chat modes in one panel. No commands, no dashboard."
      points={streamerPoints}
    >
      <StreamerDemo />
    </RoleSection>
  );
}
