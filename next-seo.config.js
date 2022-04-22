/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "TerraDash",
  titleTemplate: "%s | Business Intelligence Dashboard for Terra Network ",
  defaultTitle:
    "TerraDash | Business Intelligence Dashboard for Terra Network ",
  description:
    "Best Business Intelligence Dashboard for Terra Network by Flipside Crypto and Setbap ",
  canonical: "https://terradash.vercel.app/",
  openGraph: {
    url: "https://terradash.vercel.app/",
    title: "TerraDash",
    description:
      "Best Business Intelligence Dashboard for Terra Network by Flipside Crypto and Setbap ",
    images: [
      {
        url: "https://og-image.sznm.dev/**TerraDash**.vercel.app.png?theme=dark&md=1&fontSize=125px",
        alt: "TerraDash by Flipside Crypto and Setbap",
      },
    ],
    site_name: "TerraDash",
  },
  twitter: {
    handle: "@flipsidecrypto",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
