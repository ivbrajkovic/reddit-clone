import { Navbar } from "@/components/Navbar/Navbar";
import { HEADER_HEIGHT } from "@/constants";
import { Box } from "@mantine/core";
import { Open_Sans } from "@next/font/google";
import React from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box component="main" pt={HEADER_HEIGHT} className={openSans.className}>
        {children}
      </Box>
    </>
  );
};
export default Layout;
