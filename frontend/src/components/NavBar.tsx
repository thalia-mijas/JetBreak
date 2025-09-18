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
  addToast,
} from "@heroui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import * as API from "../services/authentication";

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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") || "false";

  const menuItems = [
    { label: "Aeropuerto", href: "/" },
    { label: "Ofertas", href: "/offers" },
  ];

  if (isAuthenticated) {
    menuItems.push({ label: "Reclamos", href: "/claims" });
    menuItems.push({ label: "Seguimiento", href: "/trackingFlights" });
  }

  const logout = () => {
    API.logout()
      .then((data) => {
        if (data.message === "Logout successful") {
          localStorage.setItem("isAuthenticated", "false");
          addToast({
            title: "Cierre de sesión",
            description: "Sesión cerrada con éxito",
            color: "success",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path
                    d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
                    data-name="Stroke 3"
                  />
                </g>
              </svg>
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

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
