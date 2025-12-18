import { useState, useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import { LocationType } from '../types/location';

function useMap(mapRef: React.RefObject<HTMLDivElement>, point: LocationType) {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current && !isRenderedRef.current && isMounted) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: point.latitude,
          lng: point.longitude,
        },
        zoom: point.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      if (isMounted) {
        setMap(instance);
        isRenderedRef.current = true;
      }
    }

    return () => {
      isMounted = false;
    };
  }, [mapRef, point]);

  return map;
}

export default useMap;
