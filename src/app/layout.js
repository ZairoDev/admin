import * as React from "react";
import "../../styles/remixicon.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
// Chat Styles
import "../../styles/chat.css";
// Globals Styles
import "../../styles/globals.css";
// Rtl Styles
import "../../styles/rtl.css";
// Dark Mode Styles
import "../../styles/dark.css";
// Theme Styles
import theme from "@/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LayoutProvider from "@/providers/LayoutProvider";
import { ReactQueryClientProvider } from "@/components/reactQueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata = {
  title: "VacationSaga admin dashboard",
  description: "This is the admin dashboard only access by company login.",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LayoutProvider>{children}</LayoutProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
