import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GramPay — Your money. Just send a message.',
  description: 'A WhatsApp-native financial assistant for simple, secure money movement.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
