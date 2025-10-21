import { useRef, useEffect } from 'react';
import { OfferPreviewType } from '../../types/offer-preview';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCustomIcon, currentCustomIcon } from './const';

type MapProps = {
  offers: OfferPreviewType[];
  selectedOfferId?: OfferPreviewType['id'] | null;
};

function Map({offers, selectedOfferId}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers);

  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon,
          }
        );
        marker.addTo(markerGroup);
      });

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section className='cities__map map' ref={mapRef}></section>
  );
}

export default Map;
