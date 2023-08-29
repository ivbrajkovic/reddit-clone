import Layout from "@/components/Layout/Layout";
import AuthModalWrapper from "@/features/auth/components/AuthModal/AuthModal";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { storeWrapper } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";

import { useUserInitialization } from "@/hooks/useUserInitialization";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const UserInitialization: FC = () => {
  useUserInitialization();
  return null;
};

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <MantineThemeProvider>
        <NotificationsProvider>
          <UserInitialization />
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
          <AuthModalWrapper />
        </NotificationsProvider>
      </MantineThemeProvider>
    </Provider>
  );
};

export default App;
