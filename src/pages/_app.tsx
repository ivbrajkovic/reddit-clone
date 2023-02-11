import Layout from "@/components/Layout/Layout";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { wrapper } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <MantineThemeProvider>
    <NotificationsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationsProvider>
  </MantineThemeProvider>
);

export default wrapper.withRedux(App);
