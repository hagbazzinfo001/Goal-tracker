import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoalProvider } from "context/GoalContext";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoalTrack - Track Your Goals and Progress",
  description:
    "Set, track, and achieve your personal and team goals with powerful visualization tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={inter.className}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main
            className="bg-white dark:bg-slate-900  "
            suppressContentEditableWarning
          >
            <GoalProvider>{children}</GoalProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
