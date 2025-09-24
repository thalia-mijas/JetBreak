import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../services/authentication";
// ...existing code...

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams<{ token: string }>();

  console.log("Token from URL:", token);

  const handleResetPassword = (token: string, newPassword: string) => {
    API.resetPassword(token, newPassword)
      .then((response) => {
        console.log("Password reset successful:", response);
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
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
                      onPress={() => handleResetPassword(token, newPassword)}
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
