import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cf-dark-red fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img
          className="h-12"
          src="https://codingfactory.aueb.gr/sites/all/themes/cf_theme/logo.png"
          alt="CF Logo"
        />
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex gap-6 text-white font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-cf-dark-red md:bg-transparent px-4 py-4 md:py-0`}
        >
          <Link
            to="/"
            className="block md:inline hover:underline hover:underline-offset-4 p-4 md:p-1"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block md:inline hover:underline hover:underline-offset-4 p-4 md:p-1"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
