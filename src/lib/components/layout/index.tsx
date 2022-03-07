import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import SidebarWithHeader from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <SidebarWithHeader >
        {children}
      </SidebarWithHeader>
      <Footer />
    </Box>
  );
};

export default Layout;
