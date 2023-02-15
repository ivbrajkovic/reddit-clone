import Layout from "@/components/Layout/Layout";
import { Auth } from "@/features/auth";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { wrapper } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => (
  <MantineThemeProvider>
    <NotificationsProvider>
      <Auth />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationsProvider>
  </MantineThemeProvider>
);

export default wrapper.withRedux(App);
