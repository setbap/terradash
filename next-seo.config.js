/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "TerraDash",
  titleTemplate: "%s | terradash",
  defaultTitle: "terradash: a dashboard for terra",
  description:
    "a dashboard for terra created by setbap as flipsidecrypto project",
  canonical: "https://terradash.vercel.com",
  openGraph: {
    url: "https://terradash.vercel.com",
    title: "TerraDash",
    description:
      "a dashboard for terra created by setbap as flipsidecrypto project",
    images: [
      {
        url: "https://og-image.sznm.dev/**TerraDash**.vercel.com.png?theme=dark&md=1&fontSize=125px",
        alt: "terradash by setbap",
      },
    ],
    site_name: "terradash",
  },
  twitter: {
    handle: "@elsinacrypto",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
