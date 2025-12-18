import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocationType } from '../types/location';

interface MapInstanceMock {
  setView: ReturnType<typeof vi.fn>;
}

interface TileLayerMock {
  addTo: ReturnType<typeof vi.fn>;
}

vi.mock('leaflet', () => {
  const addToMock = vi.fn();
  const mapInstanceMock: MapInstanceMock = { setView: vi.fn() };
  const mapMock = vi.fn(() => mapInstanceMock);
  const tileLayerMock = vi.fn(() => ({ addTo: addToMock }));

  return {
    default: {
      map: mapMock,
      tileLayer: tileLayerMock,
    },
  };
});

import useMap from './useMap';
import leaflet from 'leaflet';

describe('useMap hook', () => {
  let mapRef: React.RefObject<HTMLDivElement>;
  const point: LocationType = { latitude: 55, longitude: 37, zoom: 10 };

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
    vi.clearAllMocks();
  });

  it('creates a map on first render', () => {
    const { result } = renderHook(() => useMap(mapRef, point));

    const leafletMock = leaflet as unknown as { map: ReturnType<typeof vi.fn>; tileLayer: ReturnType<typeof vi.fn> };

    expect(leafletMock.map).toHaveBeenCalledTimes(1);
    expect(leafletMock.tileLayer).toHaveBeenCalledTimes(1);
    expect(result.current).not.toBeNull();
  });

  it('does not create a new map on rerender', () => {
    const { rerender } = renderHook(
      ({ pt }: { pt: LocationType }) => useMap(mapRef, pt),
      { initialProps: { pt: point } }
    );

    rerender({ pt: point });

    const leafletMock = leaflet as unknown as { map: ReturnType<typeof vi.fn> };
    expect(leafletMock.map).toHaveBeenCalledTimes(1);
  });

  it('calls addTo on tileLayer', () => {
    renderHook(() => useMap(mapRef, point));

    const leafletMock = leaflet as unknown as { tileLayer: ReturnType<typeof vi.fn> };
    const tileLayerCall = leafletMock.tileLayer.mock.results[0].value as TileLayerMock;
    expect(tileLayerCall.addTo).toHaveBeenCalledTimes(1);
  });

  it('does not call setState after unmount', () => {
    const { unmount } = renderHook(() => useMap(mapRef, point));
    expect(() => act(() => unmount())).not.toThrow();
  });
});
