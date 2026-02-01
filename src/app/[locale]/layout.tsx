import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Nunito } from "next/font/google";
import { Locale, routing } from "../../../i18n/route";
import LocaleSwitcher from "../_components/LocaleSwitcher";
import "./globals.css";

// Font Configuration
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Metadata for the Page
export const metadata: Metadata = {
  title:
    "Token Pocket - Your secure crypto & Defi Wallet | TP Wallet - ETH....",
  icons: {
    icon: [
      // SVG version
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%233b82f6"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-weight="bold">TP</text></svg>',
        type: "image/svg+xml",
      },
      // ICO fallback
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      // Apple touch icon
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%233b82f6"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-weight="bold">TP</text></svg>',
        type: "image/svg+xml",
        sizes: "180x180",
      },
    ],
  },
  // Optional: Add these if you create the files
  manifest: "/site.webmanifest",
};
// Define Props for RootLayout
type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

// Main Layout Component
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${nunito.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            {/* Header with Locale Switcher */}
            <header className="p-4 flex justify-end">
              <LocaleSwitcher />
            </header>
            {/* Main Content Area */}
            <main className="flex-1">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "fr", "de", "ar", "es", "ru", "zh", "fa", "tr"]; // Supported locales
  return locales.map((locale) => ({ locale }));
}
