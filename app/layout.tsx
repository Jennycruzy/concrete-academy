import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Concrete Academy — DeFi Education Platform',
  description:
    'Learn Concrete DeFi through structured content and ranked quizzes. Powered by official documentation. 6 languages.',
  keywords: ['Concrete DeFi', 'DeFi education', 'yield infrastructure', 'blockchain learning'],
  openGraph: {
    title: 'Concrete Academy',
    description: 'Master DeFi\'s most sophisticated yield infrastructure.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
