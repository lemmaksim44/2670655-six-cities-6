import { useRef, useEffect } from 'react';
import { OfferPreviewType } from '../../types/offer-preview';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCustomIcon, currentCustomIcon } from './const';
import './map.css';

type MapProps = {
  offers: OfferPreviewType[];
  block: string;
  selectedOfferId?: OfferPreviewType['id'] | null;
  currentOffer?: OfferPreviewType | null;
};

function Map({offers, block, selectedOfferId, currentOffer}: MapProps) {
  const mapRef = useRef(null);
  const isOfferMap = block === 'offer__map';

  const centerPoint = isOfferMap && currentOffer
    ? currentOffer.location
    : offers[0].city.location;

  const map = useMap(mapRef, centerPoint);

  useEffect(() => {
    if (map) {
      map.setView([centerPoint.latitude, centerPoint.longitude], centerPoint.zoom);

      const markerGroup = leaflet.layerGroup().addTo(map);

      const offersToRender = isOfferMap && currentOffer
        ? [currentOffer, ...offers]
        : offers;

      offersToRender.forEach((offer) => {
        const marker = leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: offer.id === selectedOfferId || offer.id === currentOffer?.id ? currentCustomIcon : defaultCustomIcon,
          }
        );
        marker.addTo(markerGroup);
      });

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, isOfferMap, offers, selectedOfferId, currentOffer, centerPoint.latitude, centerPoint.longitude, centerPoint.zoom]);

  return (
    <section className={`${block} map ${isOfferMap ? 'map--offer' : ''}`} ref={mapRef}></section>
  );
}

export default Map;
