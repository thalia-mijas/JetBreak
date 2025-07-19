import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12 z-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
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
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-[#56DFCF]">
                    Información de Vuelos
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:text-[#56DFCF]">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-[#56DFCF]">
                    Tiendas
                  </Link>
                </li>
                <li>
                  <Link href="/claims" className="hover:text-[#56DFCF]">
                    Reclamos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-[#56DFCF]">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#56DFCF]">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#56DFCF]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#56DFCF]">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#56DFCF]"
                >
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#56DFCF]"
                >
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#56DFCF]"
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JetBreak. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
