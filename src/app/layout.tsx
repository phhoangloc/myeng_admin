import type { Metadata } from "next";

import "../style/globals.css";
import Provider from "@/redux/component/provider";
import Layout from "@/components/layout";


export const metadata: Metadata = {
  title: "My English",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scrbar-none">
        <Provider>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}
