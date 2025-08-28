import { Button, Card, CardBody, Input, Link, Tab, Tabs } from "@heroui/react";
import React from "react";

export default function Login() {
  const [selected, setSelected] = React.useState("login");

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Iniciar sesión
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accede a tu cuenta para disfrutar de todas las funcionalidades
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
                      />
                      <Input
                        isRequired
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                      />
                      <p className="text-right text-small">
                        <Link
                          size="sm"
                          onPress={() => setSelected("forgot-password")}
                        >
                          Olvide mi contraseña
                        </Link>
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
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
                      />
                      <Input
                        isRequired
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                      />
                      <p className="text-center text-small">
                        Ya tienes una cuenta?{" "}
                        <Link size="sm" onPress={() => setSelected("login")}>
                          Iniciar sesión
                        </Link>
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
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
      </section>
    </>
  );
}
