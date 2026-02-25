import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro Se Litigant - AI Legal Assistant",
  description: "Your AI Legal Partner for Smarter Drafting, Research, and Case Preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 z-10">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Welcome to Pro Se Litigant</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  New Matter
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></div>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>
            <footer className="p-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              <p>Disclaimer: This service provides AI-assisted legal research and drafting tools only and does not constitute legal advice. Users are solely responsible for reviewing and validating all outputs before use. The platform is not a substitute for a licensed attorney.</p>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
