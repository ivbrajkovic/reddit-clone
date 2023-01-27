import Layout from "@/components/Layout/Layout";
import { AuthModalMachineProvider } from "@/context/authModalContext";
import { theme } from "@/mantine/theme";
import { MantineProvider } from "@mantine/core";
import { inspect } from "@xstate/inspect";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { RecoilDevTools } from "recoil-toolkit";

if (typeof window !== "undefined") {
  inspect({ iframe: false });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthModalMachineProvider>
      <RecoilRoot>
        <RecoilDevTools forceSerialize={false} />
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </RecoilRoot>
    </AuthModalMachineProvider>
  );
}
