import { addToast, Button, cn } from "@heroui/react";
import { Heart, Plane } from "lucide-react";
import type { Dispatch } from "react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { OfferDetail } from "../models/offerDetail";
import type { trackingFlight } from "../models/tracking";
import * as TrackingAPI from "../services/tracking";

export default function TrackButton({
  trackingFlights,
  offerDetail,
  setTrackingFlights,
}: {
  trackingFlights: trackingFlight[];
  offerDetail: OfferDetail;
  setTrackingFlights: Dispatch<trackingFlight[]>;
}) {
  const [loading, seLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const trackingFlightCodes = useMemo(
    () => Object.values(trackingFlights).map((flight) => flight.flight_iata),
    [trackingFlights]
  );

  const { outboundSegment, returnSegment } = useMemo(
    () => ({
      outboundSegment: offerDetail.itineraries[0].segments[0],
      returnSegment: offerDetail.itineraries[1].segments[0],
    }),
    [offerDetail.itineraries]
  );

  const { outboundCode, returnCode } = useMemo(
    () => ({
      outboundCode: `${outboundSegment.carrierCode}${outboundSegment.number}`,
      returnCode: `${returnSegment.carrierCode}${returnSegment.number}`,
    }),
    [
      outboundSegment.carrierCode,
      outboundSegment.number,
      returnSegment.carrierCode,
      returnSegment.number,
    ]
  );

  const isTracking = useMemo(
    () =>
      trackingFlightCodes.includes(outboundCode) &&
      trackingFlightCodes.includes(returnCode),
    [outboundCode, returnCode, trackingFlightCodes]
  );

  const { outboundTracking, returnTracking } = useMemo(() => {
    const outboundTracking = trackingFlights.find(
      (flight) => flight.flight_iata === outboundCode
    );

    const returnTracking = trackingFlights.find(
      (flight) => flight.flight_iata === returnCode
    );

    return { outboundTracking, returnTracking };
  }, [outboundCode, returnCode, trackingFlights]);

  const handleTrackingFlight = useCallback(
    (
      outboundFlight: string,
      outboundDate: string,
      returnFlight: string,
      returnDate: string
    ) => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      const outboundDateFormatted = outboundDate.split("T")[0];
      const returnDateFormatted = returnDate.split("T")[0];

      console.log(typeof outboundDateFormatted, typeof returnDateFormatted);

      const outboundData = {
        user_id: Number(localStorage.getItem("user_id")),
        flight_iata: outboundFlight,
        date: outboundDateFormatted,
      };
      const returnData = {
        user_id: Number(localStorage.getItem("user_id")),
        flight_iata: returnFlight,
        date: returnDateFormatted,
      };

      seLoading(true);

      Promise.all([
        TrackingAPI.addTrackingFlight(outboundData),
        TrackingAPI.addTrackingFlight(returnData),
      ])
        .then(() => {
          addToast({
            title: "Éxito",
            description: "Vuelos añadidos exitosamente al seguimiento.",
            color: "success",
            icon: <Plane />,
          });
          TrackingAPI.getTrackingFlights().then(setTrackingFlights);
        })
        .catch((err) => {
          // Alguna llamada falló
          console.error("Error añadiendo vuelos al seguimiento:", err);
          addToast({
            title: "Error",
            description:
              err.message ||
              "Hubo un error al añadir los vuelos al seguimiento.",
            color: "danger",
            icon: <Plane />,
          });
        })
        .finally(() => seLoading(false));
    },
    [isAuthenticated, navigate, setTrackingFlights]
  );

  const handleDeleteTrackingFlight = useCallback(
    (trackingId1: number, trackingId2: number) => {
      seLoading(true);
      Promise.all([
        TrackingAPI.removeTrackingFlight(trackingId1),
        TrackingAPI.removeTrackingFlight(trackingId2),
      ])
        .then(() => {
          addToast({
            title: "Éxito",
            description: "Vuelos eliminados del seguimiento.",
            color: "success",
            icon: <Plane />,
          });
          TrackingAPI.getTrackingFlights().then(setTrackingFlights);
        })
        .catch((err) => {
          console.error("Error eliminando vuelo del seguimiento:", err);
          addToast({
            title: "Error",
            description:
              err.message ||
              "Hubo un error al eliminar los vuelos del seguimiento.",
            color: "danger",
            icon: <Plane />,
          });
        })
        .finally(() => seLoading(false));
    },
    [setTrackingFlights]
  );

  const handleToggleTracking = useCallback(() => {
    if (isTracking) {
      handleDeleteTrackingFlight(
        outboundTracking?.id ?? 0,
        returnTracking?.id ?? 0
      );

      return;
    }

    handleTrackingFlight(
      outboundCode,
      outboundSegment.departure.at,
      returnCode,
      returnSegment.departure.at
    );
  }, [
    handleDeleteTrackingFlight,
    handleTrackingFlight,
    isTracking,
    outboundCode,
    outboundSegment.departure.at,
    outboundTracking?.id,
    returnCode,
    returnSegment.departure.at,
    returnTracking?.id,
  ]);

  return (
    <Button
      isIconOnly
      variant="light"
      isDisabled={loading}
      onPress={handleToggleTracking}
    >
      <Heart className={cn(isTracking && "fill-red-500 text-red-500")} />
    </Button>
  );
}
