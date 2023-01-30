import Layout from "@/components/Layout/Layout";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { store } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineThemeProvider>
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </MantineThemeProvider>
    </Provider>
  );
}
