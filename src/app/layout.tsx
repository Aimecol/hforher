import type { Metadata } from "next";
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/lib/query-provider';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "H for Her - Fashion from the Heart | Rwanda's Premier TikTok Fashion Store",
    template: "%s | H for Her"
  },
  description: "Discover the latest fashion trends from China to Rwanda. Quality clothing for modern women who value style, comfort, and affordability. Free delivery in Rwanda on orders over 50,000 RWF.",
  keywords: [
    "fashion", "women's clothing", "Rwanda fashion", "TikTok fashion", 
    "Chinese fashion", "online shopping", "dresses", "accessories", 
    "free delivery Rwanda", "affordable fashion"
  ],
  authors: [{ name: "H for Her" }],
  creator: "H for Her",
  publisher: "H for Her",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hforher.rw",
    siteName: "H for Her",
    title: "H for Her - Fashion from the Heart",
    description: "Rwanda's premier TikTok fashion store bringing you the latest trends from China.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "H for Her - Fashion from the Heart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "H for Her - Fashion from the Heart",
    description: "Rwanda's premier TikTok fashion store bringing you the latest trends from China.",
    images: ["/og-image.jpg"],
    creator: "@hforher",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://hforher.rw",
    languages: {
      "en-US": "https://hforher.rw",
      "rw-RW": "https://hforher.rw/rw",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${dancing.variable}`}>
      <body className="font-poppins antialiased">
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartSidebar />
          <Toaster />
        </QueryProvider>
        
        {/* Analytics Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // TikTok Pixel
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'YOUR_TIKTOK_PIXEL_ID'}');
                ttq.page();
              }(window, document, 'ttq');
              
              // Google Analytics
              if (typeof gtag !== 'undefined') {
                gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'GA_TRACKING_ID'}');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
