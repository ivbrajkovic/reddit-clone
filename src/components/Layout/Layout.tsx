import { Navbar } from "@/components/Navbar/Navbar";
import { useCommunitySnippets } from "@/features/communities/hooks/useCommunitySnippets";
import { Open_Sans } from "@next/font/google";
import React from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useCommunitySnippets();
  return (
    <main className={openSans.className}>
      <Navbar />
      {children}
    </main>
  );
};
export default Layout;
