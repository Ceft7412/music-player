import { Inter } from "next/font/google";
import "../resources/sass/styles.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linger",
  description:
    "Linger is an app that lets you listen to music and read lyrics at the same time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
