import { useRef, useEffect } from "react";
import maplibregl, { Map } from "maplibre-gl";
import '../styles/options-map.css'
import { apiGet } from "../../../services/api_client";
import { ApiErrorType, isApiErrorType } from "../../../data/types";

interface iFoundOptionMap {
    handleCoordinates: (coords: [number, number]) => void;
}

const foundOptionMap = ({handleCoordinates}: iFoundOptionMap) => {


  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const zoom = 1;

  useEffect(() => {
    const abortController = new AbortController();

    const setUpMap = async () => {
        
      try {
        const getKey: Awaited<{key: string} | ApiErrorType> = await apiGet("data/maptilerkey", abortController);
        if (getKey && (getKey as { key: string }).key) {
          console.log("Success getting key");
        } else {
          if (isApiErrorType(getKey)) {
            throw new Error((getKey as ApiErrorType).error);
          } else {
            throw new Error("Unknown Error: Unable to fetch map key.");
          }
        }
        const API_KEY = (getKey as { key: string }).key;
        
        if (mapContainer.current) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [-74, 39],
            zoom: zoom,
          });
          // The `click` event is an example of a `MapMouseEvent`.
          // Set up an event listener on the map.
          map.current.on("click", function (e) {
            // The event object (e) contains information like the
            // coordinates of the point on the map that was clicked.
            console.log("A click event has occurred at " + e.lngLat);
            handleCoordinates([e.lngLat.lng, e.lngLat.lat]);
          });
        }

      } catch (err) {
        console.error(err);
      }
 
    }
    setUpMap();
  }, [])
    

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default foundOptionMap
