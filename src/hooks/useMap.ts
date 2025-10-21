import { useState, useRef, useEffect } from "react";
import leaflet from "leaflet";
import { OfferPreviewType } from "../types/offer-preview";

function useMap(mapRef: React.RefObject<HTMLDivElement>, offers: OfferPreviewType[],) {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);
  const city = offers[0].city;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
