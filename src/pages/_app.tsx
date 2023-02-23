import Layout from "@/components/Layout/Layout";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { wrapper } from "@/store/store";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";

import AuthModalWrapper from "@/features/auth/components/AuthModal/AuthModal";
import { useCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { usePostVotes } from "@/features/posts/hooks/usePostVotes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => {
  usePostVotes();
  useCommunitySnippets();
  return (
    <MantineThemeProvider>
      <NotificationsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <AuthModalWrapper />
      </NotificationsProvider>
    </MantineThemeProvider>
  );
};

export default wrapper.withRedux(App);
