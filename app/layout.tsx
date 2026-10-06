import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GramPay — WhatsApp for people. MCP for agents.',
  description: 'One GramPay financial core with two interfaces: WhatsApp for people and MCP for AI agents.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
