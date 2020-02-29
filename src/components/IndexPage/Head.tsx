import NextHead from "next/head";
import * as React from "react";
import { MY_JOB_TITLE, MY_NAME, MY_SOCIAL_MEDIA_LINKS } from "../../constant/data";
import { PROFILE_IMAGE_PATH } from "../../constant/staticFilePaths";
import useLocale from "../../hooks/useLocale";
import useCanonicalURL from "./useCanonicalURL";
import useTranslation from "../../hooks/useTranslation";

export default function Head() {
  const { availableLocales, currentLocale } = useLocale();
  const canonicalURL = useCanonicalURL();
  const title = useTranslation("WEBSITE_TITLE");
  const description = useTranslation("WEBSITE_DESCRIPTION");
  const profileImageURL = new URL(PROFILE_IMAGE_PATH, canonicalURL.origin);

  return (
    <NextHead>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonicalURL.href} key="canonical" />

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => {
          const url = new URL(canonicalURL.href);
          url.searchParams.set("hl", locale);

          return ( 
            <link
              rel="alternate"
              hrefLang={locale}
              href={url.href}
              key={`alternate:${locale}`}
            />
          );
        })
      }

      {(() => {
        const url = new URL("/posts/feed.xml", canonicalURL.origin);
        url.searchParams.set("hl", currentLocale);

        return (
          <link
            rel="alternate"
            type="application/atom+xml"
            title={`Blog post Atom feed (${currentLocale})`}
            href={url.href}
            key={`atomFeed:${currentLocale}`}
          />
        );
      })()}

      <script type="application/ld+json" key="linked-data">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          url: canonicalURL.href,
          name: MY_NAME,
          image: profileImageURL.href,
          jobTitle: MY_JOB_TITLE,
          sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
        })}
      </script>

      <meta property="og:url" content={canonicalURL.href} key="og:url" />
      <meta property="og:type" content="profile" key="og:type" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:locale" content={currentLocale} key="og:locale" />
      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => (
          <meta
            property="og:locale:alternate"
            content={locale}
            key={`og:locale:${locale}`}
          />
        ))}
      <meta property="og:site_name" content={title} key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:image"
        content={profileImageURL.href}
        key="og:image"
      />
    </NextHead>
  )
}