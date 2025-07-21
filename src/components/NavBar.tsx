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
    <header className="sticky top-0 z-50 border-b bg-[#EAEFEF]">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <span className="text-xl font-bold text-gray-900">JetBreak</span>
        </div>
        <nav className="hidden items-center space-x-6 sm:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="bordered"
          size="sm"
          className="border-primary hover:bg-primary rounded-[10px] border-2 p-2 transition-colors hover:text-black"
        >
          Iniciar Sesión
        </Button>
      </div>
    </header>
  );
}
