import Layout from "@/components/Layout/Layout";
import AuthModalWrapper from "@/features/auth/components/AuthModal/AuthModal";
import { useCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { usePostVotes } from "@/features/posts/hooks/usePostVotes";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { storeWrapper } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const UserInitComponent: FC = () => {
  usePostVotes();
  useCommunitySnippets();
  return null;
};

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <MantineThemeProvider>
        <NotificationsProvider>
          <UserInitComponent />
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
