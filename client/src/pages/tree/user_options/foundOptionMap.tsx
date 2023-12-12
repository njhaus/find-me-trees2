import { useState, useRef, useEffect } from "react";
import maplibregl, { Map } from "maplibre-gl";
import '../styles/options-map.css'

interface iFoundOptionMap {
    handleCoordinates: (coords: [number, number]) => void;
}

const foundOptionMap = ({handleCoordinates}: iFoundOptionMap) => {


  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom] = useState(1);
    const [API_KEY] = useState("2XZKg54dnt7JS7AZhe7J");

    useEffect(() => {
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
              handleCoordinates([e.lngLat.lng, e.lngLat.lat])
          });
        }
    }, [])
    

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default foundOptionMap
