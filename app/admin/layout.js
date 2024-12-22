import "../globals.css";

export const metadata = {
  title: "Copa Total",
  description: "Italian Football Championships and Tournaments",
};

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 py-4 font">
      <div className="container mx-auto">
        <h1 className="text-xl font-semibold text-gray-950">
          Adminstrare Campionate si Turnee
        </h1>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
