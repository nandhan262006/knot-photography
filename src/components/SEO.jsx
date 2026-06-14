import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://theknotphotography.com';
const SITE_NAME = 'THE KNOT Photography';
const DEFAULT_TITLE = 'THE KNOT Photography | Top Wedding Photographers in Nellore, Andhra Pradesh';
const DEFAULT_DESC = 'THE KNOT Photography - Top photographers in Nellore offering premium wedding, maternity, newborn & kids studio photography. Andhra Pradesh\'s best photography studio for cinematic wedding films, pre-wedding shoots, and 3D kids studio. Book your session today!';
const DEFAULT_IMAGE = '/images/homepage.webp';
const DEFAULT_KEYWORDS = 'top photographers in nellore, best photographers in nellore, wedding photography nellore, wedding photographer nellore, the knot photography, premium photography studio nellore, pre-wedding shoot nellore, bridal photography nellore, baby photography nellore, maternity shoot nellore, kids studio nellore, 3d studio nellore, best wedding photographers nellore, top photo graphers in nellore';

export default function SEO({ title, description, image, url, type = 'website', keywords, jsonLd }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageImage = image || DEFAULT_IMAGE;
  const canonicalUrl = url || SITE_URL;
  const fullImageUrl = pageImage.startsWith('http') ? pageImage : `${SITE_URL}${pageImage}`;
  const metaKeywords = keywords || DEFAULT_KEYWORDS;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={metaKeywords} />
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
