import Image from "next/image";

export function PixelIcon({ rows, className = "" }: { rows: string[]; className?: string }) {
  return (
    <div className={`grid grid-cols-7 gap-px w-7 h-7 ${className}`} aria-hidden>
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) => (
          <span key={`${x}-${y}`} className={c === "1" ? "bg-mint" : "bg-transparent"} />
        )),
      )}
    </div>
  );
}

export function Mark({ size = 28 }: { size?: number }) {
  return <Image src="/brand/logo.png" width={size} height={size} alt="" className="rounded-md" priority />;
}
