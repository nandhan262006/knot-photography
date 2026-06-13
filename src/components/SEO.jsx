import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://theknotphotography.com';
const SITE_NAME = 'THE KNOT Photography';
const DEFAULT_TITLE = 'THE KNOT Photography | Premium Wedding Photography Studio, Nellore';
const DEFAULT_DESC = 'THE KNOT Photography - Premium wedding photography studio based in Nellore, Andhra Pradesh, India. Capture your memories as timeless cinematic heirlooms.';
const DEFAULT_IMAGE = '/images/homepage.png';

export default function SEO({ title, description, image, url, type = 'website', jsonLd }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageImage = image || DEFAULT_IMAGE;
  const canonicalUrl = url || SITE_URL;
  const fullImageUrl = pageImage.startsWith('http') ? pageImage : `${SITE_URL}${pageImage}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={fullImageUrl} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
