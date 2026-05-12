'use client';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useMemo } from 'react';

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

export default function MapChart() {
  // A simplistic swing logic based on generic state names for visual demo
  const generateSwingColor = () => {
    const colors = ['#f97316', '#22c55e', '#a8a29e'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [80, 22] // Center over India
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={generateSwingColor()}
                stroke="#111"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#fff", outline: "none", cursor: "pointer" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
