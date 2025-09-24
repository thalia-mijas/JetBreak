import { Button, Card, CardBody, Input, addToast } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "../services/authentication";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecoverPassword = () => {
    API.recoverPassword(email)
      .then((response) => {
        console.log("Recovery email sent:", response);
        if (response.message === "Recovery email sent") {
          setEmail("");
          addToast({
            title: "Recuperación de contraseña",
            description: "Se ha enviado un correo electrónico de recuperación",
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
          navigate("/login");
        } else {
          addToast({
            title: "Error",
            description: "No se pudo enviar el correo de recuperación",
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
                    d="M12 21.838c-5.421 0-9.838-4.417-9.838-9.838S6.579 2.162 12 2.162s9.838 4.417 9.838 9.838-4.417 9.838-9.838 9.838z"
                    data-name="Stroke 1"
                  />
                  <path
                    d="M15.354 8.462l-6.708 6.708M8.646 8.462l6.708 6.708"
                    data-name="Stroke 3"
                  />
                </g>
              </svg>
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error sending recovery email:", error);
      });
  };

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      onPress={() => handleRecoverPassword()}
                    >
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
