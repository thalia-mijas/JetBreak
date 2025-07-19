import { Button, Link } from "@heroui/react";
import React from "react";

export const Logo = () => {
  return (
    <img
      src="icon.svg"
      alt="JetBrake Logo"
      height={70}
      width={70}
      className="mt-2"
    />
  );
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Vuelos", href: "/" },
    { label: "Ofertas", href: "/offers" },
    { label: "Tiendas", href: "/stores" },
    { label: "Reclamos", href: "/claims" },
  ];

  return (
    <header className="border-b bg-[#EAEFEF] sticky top-0 z-50">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <span className="text-xl font-bold text-gray-900">JetBreak</span>
        </div>
        <nav className="hidden sm:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-[#56DFCF] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="bordered"
          size="sm"
          className="border-[#56DFCF] border-2 hover:bg-[#56DFCF] hover:text-black transition-colors rounded-[10px] p-2"
        >
          Iniciar Sesión
        </Button>
      </div>
    </header>
  );
}
