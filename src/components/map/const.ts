import leaflet from 'leaflet';
import pin from '/img/pin.svg';
import pinActive from '/img/pin-active.svg';

export const defaultCustomIcon = leaflet.icon({
  iconUrl: pin,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: pinActive,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});
