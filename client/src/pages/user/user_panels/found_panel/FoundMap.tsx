import { Box } from "@chakra-ui/react"

import React, { useRef, useEffect, useState } from "react";
import maplibregl, { Map, Source } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../../styles/map.css";

import { iUserFound } from "../../../../data/user_data/userData";
import { current } from "immer";
import { GiConsoleController } from "react-icons/gi";

interface iFoundMap {
  data: iUserFound[];
  onClick: (form: null, location: [number, number]) => void;
  location: [number, number];
}


const FoundMap = ({ data, onClick, location }: iFoundMap) => {
  
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom] = useState(1);
  const [API_KEY] = useState("2XZKg54dnt7JS7AZhe7J");
  const currentLocation = location;
  const mapData = {
    type: "FeatureCollection",
    features: data.map((found) => ({
      type: "feature",
      properties: {
        id: found._id._id,
        title: found._id.title,
        imgSrc: found._id.imgSrc[0],
      },
      geometry: {
        type: "Point",
        coordinates: found.location.coordinates,
      },
    })),
  };

  useEffect(() => {
    if (mapContainer.current && location) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [currentLocation[0], currentLocation[1]],
        zoom: zoom,
      });
      map.current.on("load", () => {
        if (map.current) {
          // Add a new source from our GeoJSON data and
          // set the 'cluster' option to true. GL-JS will
          // add the point_count property to your source data.
          map.current.addSource("trees", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: mapData,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
          });

          map.current.addLayer({
            id: "clusters",
            type: "circle",
            source: "trees",
            filter: ["has", "point_count"],
            paint: {
              // Use step expressions (https://maplibre.org/maplibre-style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
            },
          });

          map.current.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "trees",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          map.current.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "trees",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#11b4da",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            },
          });

          // inspect a cluster on click
          map.current.on("click", "clusters", (e) => {
            if (map.current) {
              const features = map.current.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });
              const clusterId = features[0].properties.cluster_id;
              if (map.current) {
                const source = map.current.getSource("trees");
                if (source) {
                  // @ts-ignore
                  source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (!err && zoom !== undefined) {
                      // @ts-ignore
                      const features = source.getClusterLeaves(
                        clusterId,
                        Infinity
                      );
                      if (features && features.length > 0) {
                        // @ts-ignore
                        map.current.easeTo({
                          center: features[0].geometry.coordinates,
                          zoom,
                        });
                      }
                    }
                  });
                }
              }
            }
          });

          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          map.current.on("click", "unclustered-point", (e) => {
            // @ts-ignore
            const coordinates = e.features[0].geometry.coordinates.slice();
            // @ts-ignore
            const title = e.features[0].properties.title;
            // @ts-ignore
            const imgSrc = e.features[0].properties.imgSrc;
            // @ts-ignore
            const id = e.features[0].properties.id;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Create elements for popup
            const popupContainer = document.createElement('div');
            const popupTitle = document.createElement('h4');
            popupTitle.textContent = title;
            const popupImg = document.createElement('img');
            popupImg.setAttribute('src', imgSrc)
            const popupLink = document.createElement('a');
            popupLink.textContent = `View ${title}`;
            popupLink.setAttribute('href', `/tree/${id}`);

            // Place popup elements in container
            popupContainer.append(popupTitle);
            popupContainer.append(popupImg);
            popupContainer.append(popupLink);

            if (map.current) {
              new maplibregl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<h5>${title}</h5><br><a href="/tree/${id}">View${title}</a>`)
                // Place popup container into popup
                .setDOMContent(popupContainer)
                .addTo(map.current);
            }
          });
          
          map.current.on("mouseenter", "clusters", () => {
            map.current
              ? (map.current.getCanvas().style.cursor = "pointer")
              : console.warn("Error setting mouse actions on popovers");
          });
          map.current.on("mouseleave", "clusters", () => {
            map.current ? map.current.getCanvas().style.cursor = "" : console.warn('Error setting mouse actions on popovers');
          });
        }
      });
    }
  }, [API_KEY, zoom, location[1], location[0]]);

  return (
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
  );
}

export default FoundMap
