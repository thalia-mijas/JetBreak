const API_KEY = process.env.DUFFEL_API_KEY;
const { Duffel } = require("@duffel/api");

exports.getOffers = async (req, res) => {
  try {
    const { origin, destination, date } = req.params;

    if (!origin || !destination || !date) {
      return res.status(400).json({
        message: "Origin, destination and date are required",
      });
    }

    const duffel = new Duffel({
      token: API_KEY,
    });

    const response = await duffel.offerRequests.create({
      slices: [
        {
          origin: origin, // Iata origen
          destination: destination, // Iata destino
          departure_date: date, // Fecha de salida
        },
      ],
      passengers: [
        {
          type: "adult",
        },
      ],
    });

    const offerRequestId = response.data.id;
    console.log("Offer Request creado:", offerRequestId);

    // Ahora puedes usar ese ID para obtener las ofertas
    const offers = await duffel.offers.list({
      offer_request_id: offerRequestId,
      sort: "total_amount",
      limit: 10,
    });

    console.log("Ofertas encontradas:", offers.data);

    const filteredOffers = offers.data.map((offer) => ({
      id: offer.id,
      owner: offer.owner.name,
      icon: offer.owner.logo_symbol_url,
      class:
        offer.slices[0].segments[0].passengers[0].cabin_class_marketing_name,
      flight: `${offer.slices[0].segments[0].marketing_carrier.iata_code} ${offer.slices[0].segments[0].marketing_carrier_flight_number}`,
      origin: offer.slices[0].segments[0].origin.name,
      departure: offer.slices[0].segments[0].departing_at,
      destination: offer.slices[0].segments[0].destination.name,
      arrival: offer.slices[0].segments[0].arriving_at,
      duration: offer.slices[0].segments[0].duration,
      total: `£${offer.total_amount} ${offer.total_currency} for ${offer.passengers[0].type}`,
    }));

    res.status(200).json(filteredOffers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
