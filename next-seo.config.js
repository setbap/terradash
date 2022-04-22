/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "TerraDash",
  titleTemplate: "%s | The Best Terra Dashboard Ever ",
  defaultTitle: "TerraDash: The Best Terra Dashboard Ever ",
  description:
    "best Dashboard for Terra Network  by Flipside Crypto and Setbap ",
  canonical: "https://terradash.vercel.app/",
  openGraph: {
    url: "https://terradash.vercel.app/",
    title: "TerraDash",
    description:
      "best Dashboard for Terra Network  by Flipside Crypto and Setbap ",
    images: [
      {
        url: "https://og-image.sznm.dev/**TerraDash**.vercel.app.png?theme=dark&md=1&fontSize=125px",
        alt: "terradash by Flipside Crypto and Setbap",
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
