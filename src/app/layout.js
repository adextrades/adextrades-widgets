import './globals.css';

export const metadata = {
  title: 'AdexTrades University',
  description: 'Interactive study resources for AdexTrades University',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
