import { addToast, Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as API from "../services/authentication";
// ...existing code...

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  console.log("Token from URL:", token);

  const handleResetPassword = (newPassword: string) => {
    if (!token) {
      addToast({
        title: "Error",
        description: "Token inválido o ausente.",
        color: "danger",
      });
      return;
    }
    API.resetPassword(token, newPassword)
      .then((response) => {
        console.log("Password reset successful:", response);
        if (response.message === "Contraseña actualizada correctamente") {
          addToast({
            title: "Contraseña actualizada",
            description: "La contraseña se ha actualizado correctamente",
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
        }
      })

      .catch((error) => {
        console.error("Error resetting password:", error);
        addToast({
          title: "Error",
          description: "Error en el cambio de contraseña: " + error.message,
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
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nueva contraseña
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ingresa tu nueva contraseña
            </p>
          </div>

          <div className="container flex flex-col w-full max-w-2xl">
            <Card className="max-w-full">
              <CardBody className="overflow-hidden">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Nueva contraseña"
                    placeholder="Ingresa tu nueva contraseña"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      onPress={() => handleResetPassword(newPassword)}
                    >
                      Restablecer contraseña
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
