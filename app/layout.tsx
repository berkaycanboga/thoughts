import Sidebar from "../components/Common/Sidebar";
import "../styles/globals.css";

export const metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Sidebar />
      </body>
    </html>
  );
}
