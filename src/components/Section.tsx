import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, title, lead, children, className = "" }: Props) {
  return (
    <section id={id} className={`border-b rule ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="stamp mb-3">
              <span className="text-mint">{index}</span> {"//"} {id}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          </div>
          {lead && <p className="max-w-sm text-fog md:text-right">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
