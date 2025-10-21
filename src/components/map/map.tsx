import { useRef, useEffect } from 'react';
import { OfferPreviewType } from '../../types/offer-preview';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pin from '/img/pin.svg';
import pinActive from '/img/pin-active.svg';

type MapProps = {
  offers: OfferPreviewType[],
  selectedOfferId?: OfferPreviewType['id'] | null,
};

function Map({offers, selectedOfferId}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: pin,
    iconSize: [30, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: pinActive,
    iconSize: [30, 40],
    iconAnchor: [20, 40],
  });

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
