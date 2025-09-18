import { Button, Card, CardBody, Input } from "@heroui/react";

export default function RecoverPassword() {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recupera tu contraseña
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ingresa tu correo electrónico para restablecer tu contraseña
            </p>
          </div>

          <div className="container flex flex-col w-full max-w-2xl">
            <Card className="max-w-full">
              <CardBody className="overflow-hidden">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onPress={() => {}}>
                      Recuperar contraseña
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
