"use client";

import { useEffect, useState } from "react";

type GeolocationData = {
  isLocationAllowed: boolean;
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  country: string | null;
};

const useGeolocation = (): GeolocationData => {
  const [geolocation, setGeolocation] = useState<GeolocationData>({
    isLocationAllowed: false,
    loading: true,
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

        setGeolocation((prev) => ({
          ...prev,
          isLocationAllowed: true,
          latitude,
          longitude,
          country,
        }));
      } catch (error) {
        setGeolocation((prev) => ({ ...prev, isLocationAllowed: false }));
      } finally {
        setGeolocation((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchGeolocation();
  }, []);

  return geolocation;
};

export default useGeolocation;
