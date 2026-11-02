import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HomeLink, LeaveHomeLink } from "@/components/HomeScroll";
import { Mark } from "@/components/PixelIcon";
import { JsonLd } from "@/components/JsonLd";
import { links } from "@/lib/links";
import { identityGraph } from "@/lib/structured-data";
import {
  IDENTITY_PATH,
  IDENTITY_SHORT,
  IDENTITY_STATEMENT,
  IDENTITY_UPDATED,
  IDENTITY_UPDATED_LABEL,
  ALLEGATION_SUMMARY,
  allegations,
  faqs,
  other,
  ours,
  timeline,
} from "@/lib/identity";

const title = "Product Identity: Kickerino by StreamBench | Kickerino";
const description = IDENTITY_SHORT;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: IDENTITY_PATH },
  openGraph: {
    title: "Product Identity: Kickerino by StreamBench",
    description,
    url: IDENTITY_PATH,
    type: "article",
    images: ["/screens/customise.png"],
  },
};

// Third-party links: readers can verify the source, but no ranking endorsement is passed.
function ThirdParty({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      {children}
    </a>
  );
}

const isThirdParty = (url: string) =>
  [other.website, other.developerUrl, other.playUrl].some((prefix) => url.startsWith(prefix));

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const comparison: { label: string; ours: ReactNode; other: ReactNode }[] = [
  {
    label: "Developer",
    ours: <External href={ours.developerUrl}>{ours.developer}</External>,
    other: <ThirdParty href={other.developerUrl}>{other.developer}</ThirdParty>,
  },
  {
    label: "Official website",
    ours: <HomeLink>{ours.websiteLabel}</HomeLink>,
    other: <ThirdParty href={other.website}>{other.websiteLabel}</ThirdParty>,
  },
  {
    label: "Distribution",
    ours: (
      <>
        <External href={ours.storeUrl}>Microsoft Store</External> (product ID <code>{ours.storeId}</code>) and{" "}
        <External href={ours.releasesUrl}>GitHub Releases</External>
      </>
    ),
    other: (
      <>
        <ThirdParty href={other.website}>kickerino.app</ThirdParty>, GitHub (
        <ThirdParty href={other.desktopRepo}>CarlBraun/Kickerino</ThirdParty>,{" "}
        <ThirdParty href={other.androidRepo}>CarlBraun/Kickerino_Android</ThirdParty>) and{" "}
        <ThirdParty href={other.playUrl}>Google Play</ThirdParty>
      </>
    ),
  },
  { label: "Platforms", ours: ours.platforms, other: other.platforms },
  { label: "Mobile app", ours: ours.mobile, other: other.mobile },
  { label: "Pricing", ours: ours.pricing, other: other.pricing },
  { label: "Source code", ours: ours.source, other: other.source },
  {
    label: "Support",
    ours: (
      <>
        <LeaveHomeLink href="/contact">kickerino.com/contact</LeaveHomeLink> and the{" "}
        <External href={links.discordServer}>StreamBench Discord</External>
      </>
    ),
    other: (
      <>
        Through CarlBraun, via <ThirdParty href={other.website}>kickerino.app</ThirdParty>
      </>
    ),
  },
];

export default function ProductIdentity() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={identityGraph({ title, description })} />

      <HomeLink className="flex items-center gap-2.5 font-semibold">
        <Mark /> Kickerino
      </HomeLink>

      <p className="stamp mt-12">
        Last updated <time dateTime={IDENTITY_UPDATED}>{IDENTITY_UPDATED_LABEL}</time>
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Product identity</h1>
      <p className="mt-4 text-fog">{IDENTITY_STATEMENT}</p>

      <div className="mt-10 space-y-12 text-fog [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-mint [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-mint">
        <section aria-labelledby="official-product">
          <h2 id="official-product">Official product and owner</h2>
          <ul>
            <li>
              <b>Product name:</b> Kickerino, also referred to as Kickerino by StreamBench.
            </li>
            <li>
              <b>Owner, developer and operator:</b> <External href={ours.developerUrl}>StreamBench</External>.
            </li>
            <li>
              <b>Official website:</b> <HomeLink>{ours.websiteLabel}</HomeLink>. The domain kickerino.com is operated by
              StreamBench.
            </li>
            <li>
              <b>What it is:</b> an independently developed desktop chat client for Kick.com, for {ours.platforms}.
            </li>
            <li>
              <b>Price:</b> {ours.pricing}
            </li>
            <li>
              <b>Official downloads:</b> the <External href={ours.storeUrl}>Microsoft Store listing</External> (product ID{" "}
              <code>{ours.storeId}</code>) and <External href={ours.releasesUrl}>{ours.releasesLabel}</External>.
            </li>
          </ul>
        </section>

        <section aria-labelledby="similar-name">
          <h2 id="similar-name">A separate product with the same name</h2>
          <p>
            Another product called Kickerino is developed by <ThirdParty href={other.developerUrl}>CarlBraun</ThirdParty>{" "}
            and distributed through <ThirdParty href={other.website}>kickerino.app</ThirdParty>, GitHub and Google Play. It
            is also a chat client for Kick.com, which is why the two are often confused.
          </p>
          <p className="mt-3">
            The two products have separate ownership, development and operations. There is no affiliation, shared ownership,
            partnership, endorsement or commercial relationship between StreamBench and CarlBraun, or between Kickerino by
            StreamBench and the Kickerino app by CarlBraun. StreamBench does not develop, distribute, support or control
            kickerino.app, the CarlBraun GitHub repositories or the Google Play app.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg border border-line-2">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="stamp caption-bottom px-4 py-3 text-left">
                Information about the CarlBraun product is taken from its public website, GitHub repositories and Google
                Play listing as of {IDENTITY_UPDATED_LABEL}, and may change.
              </caption>
              <thead className="bg-panel text-white">
                <tr>
                  <th scope="col" className="w-36 px-4 py-3 font-semibold">
                    <span className="sr-only">Attribute</span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Kickerino by StreamBench
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Kickerino by CarlBraun
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-line-2 align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-white">
                      {row.label}
                    </th>
                    <td className="px-4 py-3">{row.ours}</td>
                    <td className="px-4 py-3">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="attribution">
          <h2 id="attribution">Correct attribution</h2>
          <p>
            Information about the Kickerino app by CarlBraun must not be attributed to Kickerino by StreamBench, and the
            reverse also applies. This includes:
          </p>
          <ul>
            <li>specifications, features, supported platforms and system requirements</li>
            <li>pricing, in-app purchases, subscriptions and donations</li>
            <li>reviews, ratings and user feedback</li>
            <li>documentation, release notes, downloads and app store listings</li>
            <li>support, accounts, refunds and security notices</li>
            <li>websites, GitHub repositories, social media accounts, statements and conduct</li>
          </ul>
          <p className="mt-3">
            In particular, Kickerino by StreamBench has no Android, iOS or other mobile app, and contains no in-app purchases.
            A Kickerino app on Google Play or any mobile app store is not published by StreamBench.
          </p>
        </section>

        <section aria-labelledby="timeline">
          <h2 id="timeline">Timeline of public events</h2>
          <p>
            This timeline lists publicly verifiable events only. StreamBench developed Kickerino privately before its public
            release, and that development history is not publicly verifiable, so it is not listed. The timeline makes no claim
            about which project began development first. CarlBraun&apos;s Kickerino was publicly available on GitHub before
            Kickerino by StreamBench was publicly released.
          </p>
          <ol className="mt-5 border-l border-line-2">
            {timeline.map((e) => (
              <li key={e.date + e.event} className="relative pb-5 pl-5 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                    e.product === "streambench" ? "bg-mint" : "bg-moss"
                  }`}
                  aria-hidden
                />
                <p className="stamp">
                  <time dateTime={e.date}>{e.label}</time>
                  {" · "}
                  {e.product === "streambench" ? "Kickerino by StreamBench" : "Kickerino by CarlBraun"}
                </p>
                <p className="mt-1">
                  {e.event}{" "}
                  <span className="text-sm text-moss">
                    Source:{" "}
                    {isThirdParty(e.source.url) ? (
                      <ThirdParty href={e.source.url}>{e.source.label}</ThirdParty>
                    ) : (
                      <External href={e.source.url}>{e.source.label}</External>
                    )}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="third-party-statements">
          <h2 id="third-party-statements">Third-party statements about kickerino.com</h2>
          <p>
            CarlBraun, the developer of the separate Kickerino product described above, has published statements on
            kickerino.app and in two GitHub repositories that describe kickerino.com as a &ldquo;scam&rdquo;. kickerino.com is
            the official website of Kickerino by StreamBench. The statements are quoted below exactly as published, with links
            to their sources so that readers can check the context themselves.
          </p>

          <div className="mt-6 space-y-5">
            {allegations.map((a) => (
              <article key={a.id} id={a.id} className="rounded-lg border border-line-2 bg-panel p-5">
                <h3>{a.location}</h3>
                <blockquote cite={a.url} className="mt-3 border-l-2 border-moss pl-4 font-mono text-sm text-white">
                  &ldquo;{a.text}&rdquo;
                </blockquote>
                <dl className="mt-4 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[10rem_1fr]">
                  <dt className="text-moss">Published by</dt>
                  <dd>
                    <ThirdParty href={other.developerUrl}>CarlBraun</ThirdParty>, developer of the Kickerino app at
                    kickerino.app
                  </dd>
                  <dt className="text-moss">Source</dt>
                  <dd className="break-all">
                    <ThirdParty href={a.url}>{a.url}</ThirdParty>
                  </dd>
                  <dt className="text-moss">First published</dt>
                  <dd>
                    {a.firstPublished ? (
                      <>
                        <time dateTime={a.firstPublished}>{a.firstPublishedLabel}</time>
                        {a.firstPublishedSource && (
                          <>
                            {" · "}
                            <ThirdParty href={a.firstPublishedSource}>view commit</ThirdParty>
                          </>
                        )}
                      </>
                    ) : (
                      a.firstPublishedLabel
                    )}
                  </dd>
                  <dt className="text-moss">Subject named</dt>
                  <dd>{a.subject}, the website of Kickerino by StreamBench</dd>
                </dl>
              </article>
            ))}
          </div>

          <h3 className="mt-8">What these statements are</h3>
          <ul>
            <li>
              They are allegations made by CarlBraun, the developer of a separate product with the same name. They are
              attributed to CarlBraun here and are not presented as fact.
            </li>
            <li>The existence of an accusation does not establish that the accusation is true.</li>
            <li>
              The banner and README lines quoted above do not include or link to supporting evidence. StreamBench is not aware
              of any finding by a court, regulator, app store or security vendor that supports them.
            </li>
            <li>StreamBench disputes the statements.</li>
          </ul>

          <h3 className="mt-8">Facts about Kickerino by StreamBench that can be checked independently</h3>
          <ul>
            <li>
              It is listed on the <External href={ours.storeUrl}>Microsoft Store</External> under product ID{" "}
              <code>{ours.storeId}</code>, published by StreamBench.
            </li>
            <li>It is free, with all features included, and contains no in-app purchases or microtransactions.</li>
            <li>
              Direct downloads are published on a public GitHub releases repository,{" "}
              <External href={ours.releasesUrl}>{ours.releasesLabel}</External>.
            </li>
            <li>
              Its <LeaveHomeLink href="/privacy">privacy policy</LeaveHomeLink> states that it contains no telemetry,
              analytics or advertising, that StreamBench operates no backend server for it, and that it communicates directly
              with Kick.com and 7TV.
            </li>
          </ul>

          <h3 className="mt-8">Accurate summary</h3>
          <p className="mt-2">{ALLEGATION_SUMMARY}</p>
          <p className="mt-3">
            Describing Kickerino by StreamBench as a scam, presenting CarlBraun&apos;s statements as established fact, or
            attributing CarlBraun&apos;s website, GitHub repositories, reputation or conduct to StreamBench would be inaccurate.
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq">Frequently asked questions</h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p className="mt-1.5">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="report">
          <h2 id="report">Report a misattribution</h2>
          <p>
            If you find information about the CarlBraun product attributed to Kickerino by StreamBench, please{" "}
            <LeaveHomeLink href="/contact">contact StreamBench</LeaveHomeLink>.
          </p>
        </section>
      </div>

      <p className="stamp mt-12">
        <HomeLink className="underline underline-offset-4 hover:text-mint">Back to home</HomeLink>
      </p>
    </main>
  );
}
