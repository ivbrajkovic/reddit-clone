import Layout from "@/components/Layout/Layout";
import { theme } from "@/mantine/theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { RecoilDevTools } from "recoil-toolkit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilDevTools forceSerialize={false} />.
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </RecoilRoot>
  );
}
