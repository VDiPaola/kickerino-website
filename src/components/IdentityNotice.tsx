import { LeaveHomeLink } from "./HomeScroll";
import { IDENTITY_PATH } from "@/lib/identity";

export function IdentityNotice() {
  return (
    <aside className="border-b rule" aria-label="Product identity notice">
      <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-moss">
        Kickerino by StreamBench is a free desktop app for Windows and Linux. It is not affiliated with the separate Kickerino
        app by CarlBraun on kickerino.app or Google Play.{" "}
        <LeaveHomeLink href={IDENTITY_PATH} className="underline decoration-line-2 underline-offset-4 hover:text-mint">
          Product identity notice
        </LeaveHomeLink>
      </p>
    </aside>
  );
}
