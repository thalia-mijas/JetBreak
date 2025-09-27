import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const Logo = () => {
  return (
    <img
      src="icon.svg"
      alt="JetBrake Logo"
      height={50}
      width={50}
      className="mt-2 mr-2"
    />
  );
};

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Aeropuerto", href: "/" },
    { label: "Ofertas", href: "/offers" },
    { label: "Reclamos", href: "/claims" },
    { label: "Seguimiento", href: "/tracking" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">JetBreak</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">JetBreak</p>
        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {isAuthenticated ? (
            <Button
              as={Link}
              color="primary"
              onPress={() => logout()}
              variant="flat"
              className="text-black"
            >
              Cerrar sesión
            </Button>
          ) : (
            <Button
              as={Link}
              color="primary"
              href="/login"
              variant="flat"
              className="text-black"
            >
              Iniciar sesión
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
