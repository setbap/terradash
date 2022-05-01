/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import defaultSEOConfig from "../../next-seo.config";
import Layout from "lib/components/layout";
import customTheme from "lib/styles/customTheme";
import "lib/styles/globals.css";
import { StaticWalletProvider, WalletControllerChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
const BaseComponent = ({ children, defaultNetwork, walletConnectChainIds }: any) => typeof window !== 'undefined' ? (
  <WalletProvider
    defaultNetwork={defaultNetwork}
    walletConnectChainIds={walletConnectChainIds}
  >
    {children}
  </WalletProvider>
) : (
  <StaticWalletProvider defaultNetwork={defaultNetwork}>
    {children}
  </StaticWalletProvider>
)

const MyApp = ({ Component, pageProps, defaultNetwork, walletConnectChainIds }: AppProps & WalletControllerChainOptions) => {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()
  const AnyComponent = Component as any;
  return (

    <BaseComponent defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds} >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={customTheme}>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <DefaultSeo {...defaultSEOConfig} />
            <AnimatePresence>
              <Layout key={router.route}>
                <AnyComponent {...pageProps} />
              </Layout>
            </AnimatePresence>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </BaseComponent >
  );
};

export default MyApp;
