import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <>
      <footer className="z-0 bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <img
                  src="icon.svg"
                  alt="JetBrake Logo"
                  height={36}
                  width={36}
                />
                <span className="text-xl font-bold">JetBreak</span>
              </div>
              <p className="text-gray-400">
                Tu plataforma confiable para información de aeropuertos y vuelos
                en tiempo real.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Información de Vuelos
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:text-primary">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-primary">
                    Tiendas
                  </Link>
                </li>
                <li>
                  <Link href="/claims" className="hover:text-primary">
                    Reclamos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Síguenos</h3>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary text-gray-400"
                >
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary text-gray-400"
                >
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary text-gray-400"
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JetBreak. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
