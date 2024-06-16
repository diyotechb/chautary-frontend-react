import { useEffect, useState } from "react";

type GeolocationData = {
  latitude: number | null;
  longitude: number | null;
  country: string | null;
};

const useGeolocation = (): GeolocationData => {
  const [geolocation, setGeolocation] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
    country: null,
  });

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        if (!("geolocation" in navigator)) {
          return;
        }
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://geocode.xyz/${latitude},${longitude}?json=1`,
        );
        const data = await response.json();
        const country = data.country;

        setGeolocation({ latitude, longitude, country });
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    fetchGeolocation();
  }, []);

  return geolocation;
};

export default useGeolocation;
