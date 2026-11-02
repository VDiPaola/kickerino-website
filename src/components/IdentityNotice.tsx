import { LeaveHomeLink } from "./HomeScroll";
import { IDENTITY_PATH } from "@/lib/identity";

export function IdentityNotice() {
  return (
    <aside className="border-b rule bg-panel" aria-label="Product identity notice">
      <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-moss">
        Kickerino is exclusively a desktop client with no affiliation to the separate Kickerino app by CarlBraun on kickerino.app or Google Play.{" "}
        see{" "}
        <LeaveHomeLink href={IDENTITY_PATH} className="underline decoration-line-2 underline-offset-4 hover:text-mint">
          Product identity notice
        </LeaveHomeLink>
      </p>
    </aside>
  );
}
