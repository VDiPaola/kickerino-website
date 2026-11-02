// Schema.org JSON-LD graphs. Every statement here mirrors visible content on the page that renders it.
// Each page renders exactly one graph; entities are linked by @id instead of being repeated.

import { links } from "./links";
import {
  SITE_URL,
  absolute,
  IDENTITY_PATH,
  IDENTITY_UPDATED,
  IDENTITY_SHORT,
  IDENTITY_STATEMENT,
  PRODUCT_NAME,
  PRODUCT_FULL_NAME,
  COMPANY_NAME,
  ours,
  other,
  allegations,
  SITE_DESCRIPTION,
  HOME_TITLE,
} from "./identity";

const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  software: `${SITE_URL}/#software`,
  brand: `${SITE_URL}/#brand`,
  homePage: `${SITE_URL}/#webpage`,
  identityPage: `${absolute(IDENTITY_PATH)}#webpage`,
  otherSoftware: `${absolute(IDENTITY_PATH)}#other-kickerino`,
  otherDeveloper: `${absolute(IDENTITY_PATH)}#carlbraun`,
};

const organization = {
  "@type": "Organization",
  "@id": ids.organization,
  name: COMPANY_NAME,
  url: ours.developerUrl,
  description: `${COMPANY_NAME} develops, publishes and operates ${PRODUCT_FULL_NAME}, a desktop chat client for Kick.com.`,
  disambiguatingDescription: `Developer of Kickerino at kickerino.com. Not affiliated with CarlBraun or the Kickerino app at kickerino.app.`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: absolute("/contact/"),
  },
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  name: PRODUCT_NAME,
  alternateName: PRODUCT_FULL_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "en",
  publisher: { "@id": ids.organization },
};

const software = {
  // SoftwareApplication describes the app; Product enables brand and manufacturer.
  "@type": ["SoftwareApplication", "Product"],
  "@id": ids.software,
  name: PRODUCT_NAME,
  alternateName: PRODUCT_FULL_NAME,
  description: SITE_DESCRIPTION,
  disambiguatingDescription: IDENTITY_SHORT,
  url: `${SITE_URL}/`,
  image: absolute("/brand/logo.png"),
  screenshot: absolute("/screens/customise.png"),
  applicationCategory: "CommunicationApplication",
  applicationSubCategory: "Kick.com chat client",
  operatingSystem: ours.platforms,
  installUrl: links.storeListing,
  downloadUrl: [links.storeListing, links.releases],
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: links.storeListing,
  },
  brand: { "@type": "Brand", "@id": ids.brand, name: PRODUCT_NAME },
  author: { "@id": ids.organization },
  publisher: { "@id": ids.organization },
  manufacturer: { "@id": ids.organization },
  sameAs: [links.storeListing, links.releases],
  subjectOf: { "@id": ids.identityPage },
};

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      software,
      {
        "@type": "WebPage",
        "@id": ids.homePage,
        url: `${SITE_URL}/`,
        name: HOME_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.software },
        mainEntity: { "@id": ids.software },
        publisher: { "@id": ids.organization },
        relatedLink: absolute(IDENTITY_PATH),
      },
    ],
  };
}

export function identityGraph({ title, description }: { title: string; description: string }) {
  const otherDeveloper = {
    "@type": "Person",
    "@id": ids.otherDeveloper,
    name: other.developer,
    url: other.developerUrl,
    sameAs: [other.developerKickUrl],
  };

  const otherSoftware = {
    "@type": "SoftwareApplication",
    "@id": ids.otherSoftware,
    name: other.name,
    url: other.website,
    operatingSystem: other.platforms,
    author: { "@id": ids.otherDeveloper },
    sameAs: [other.desktopRepo, other.androidRepo, other.playUrl],
    disambiguatingDescription:
      "A separate Kick.com chat client developed by CarlBraun and distributed through kickerino.app, GitHub and Google Play (com.Kickerino). Not affiliated with StreamBench or kickerino.com.",
  };

  // Claim (schema.org) records who made each statement, where and when, and what it names.
  // It attributes the statements without asserting that they are true or false.
  const claims = allegations.map((a) => ({
    "@type": "Claim",
    "@id": `${absolute(IDENTITY_PATH)}#${a.id}`,
    text: a.text,
    author: { "@id": ids.otherDeveloper },
    about: { "@id": ids.website },
    appearance: { "@type": "CreativeWork", url: a.url },
    ...(a.firstPublished && { datePublished: a.firstPublished }),
    ...(a.firstPublishedSource && {
      firstAppearance: { "@type": "CreativeWork", url: a.firstPublishedSource },
    }),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      software,
      {
        "@type": "AboutPage",
        "@id": ids.identityPage,
        url: absolute(IDENTITY_PATH),
        name: title,
        description,
        abstract: IDENTITY_STATEMENT,
        inLanguage: "en",
        datePublished: IDENTITY_UPDATED,
        dateModified: IDENTITY_UPDATED,
        isPartOf: { "@id": ids.website },
        about: [{ "@id": ids.software }, { "@id": ids.organization }],
        mentions: [
          { "@id": ids.otherSoftware },
          { "@id": ids.otherDeveloper },
          ...claims.map((c) => ({ "@id": c["@id"] })),
        ],
        publisher: { "@id": ids.organization },
      },
      otherDeveloper,
      otherSoftware,
      ...claims,
    ],
  };
}
