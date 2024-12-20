import "./globals.css";

export const metadata = {
  title: "Copa Total",
  description: "Italian Football Championships and Tournaments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
