import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '700', '900'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '600'] });

export const metadata = {
  title: 'Nuelbilly Prints | High-End Printing Shomolu',
  description: 'Precision in Every Impression. Luxury packaging and commercial printing in Lagos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}