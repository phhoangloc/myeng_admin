import type { Metadata } from "next";

import "../style/globals.css";
import Provider from "@/redux/component/provider";
import Layout from "@/components/layout";
import { Montserrat } from 'next/font/google'
import Modal from "@/components/modal";

const font = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

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
      <body className={font.className + " " + "scrbar-none"}>
        <Provider>
          <Modal />
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}
