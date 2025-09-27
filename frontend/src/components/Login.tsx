import {
  addToast,
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from "@heroui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import * as API from "../services/authentication";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const [selected, setSelected] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rname, setRname] = React.useState("");
  const [remail, setRemail] = React.useState("");
  const [rpassword, setRpassword] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    API.register(userData)
      .then((data) => {
        console.log("Respuesta del registro:", data);
        if (data.message === "User registered successfully") {
          addToast({
            title: "Creación de usuario",
            description: "Usuario registrado con éxito",
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
          setSelected("login");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        addToast({
          title: "Error",
          description: "Error registrando usuario",
          color: "danger",
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
      });
  };

  if (isAuthenticated) {
    const from = location.state?.from?.pathname ?? "/";
    navigate(from, { replace: true });
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Iniciar sesión
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accede a tu cuenta para reclamos o seguimiento de vuelos
            </p>
          </div>

          <div className="container flex flex-col w-full max-w-2xl">
            <Card className="max-w-full">
              <CardBody className="overflow-hidden">
                <Tabs
                  fullWidth
                  aria-label="Tabs form"
                  selectedKey={selected}
                  size="md"
                  onSelectionChange={(key) => setSelected(key as string)}
                >
                  <Tab key="login" title="Inicio de sesión">
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        isRequired
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="text-right text-small">
                        <Link size="sm" href="/recover-password">
                          Olvide mi contraseña
                        </Link>
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          fullWidth
                          color="primary"
                          onPress={async () => {
                            await login(email, password);
                          }}
                        >
                          Iniciar sesión
                        </Button>
                      </div>
                      <p className="text-center text-small">
                        Necesitas crear una cuenta?{" "}
                        <Link size="sm" onPress={() => setSelected("sign-up")}>
                          Regístrate
                        </Link>
                      </p>
                    </form>
                  </Tab>
                  <Tab key="sign-up" title="Registro">
                    <form className="flex flex-col gap-4 h-[300px]">
                      <Input
                        isRequired
                        label="Nombre"
                        placeholder="Ingresa tus nombres y apellidos"
                        type="text"
                        value={rname}
                        onChange={(e) => setRname(e.target.value)}
                      />
                      <Input
                        isRequired
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                        value={remail}
                        onChange={(e) => setRemail(e.target.value)}
                      />
                      <Input
                        isRequired
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                        value={rpassword}
                        onChange={(e) => setRpassword(e.target.value)}
                      />
                      <p className="text-center text-small">
                        Ya tienes una cuenta?{" "}
                        <Link size="sm" onPress={() => setSelected("login")}>
                          Iniciar sesión
                        </Link>
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          fullWidth
                          color="primary"
                          onPress={() => {
                            handleRegister({
                              name: rname,
                              email: remail,
                              password: rpassword,
                            });
                          }}
                        >
                          Regístrate
                        </Button>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
