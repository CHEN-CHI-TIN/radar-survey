export default function SVGRadarComponent({ radius = 80, zone = 1, setZone }) {
  const diameter = radius * 2;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={diameter} height={diameter}>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
          <feDropShadow
            dx="1"
            dy="1"
            stdDeviation="5"
            floodColor="#000000"
            floodOpacity="0.5"
          />
        </filter>
      </defs>
      <path
        d={`M${radius},${radius} L${radius},${
          radius - radius
        } A${radius},${radius} 0 0,1 ${radius * 2},${radius} Z`}
        fill={zone !== 4 ? "rgba(0,0,0,0.25)" : "#0056b3"}
        filter="url(#shadow)"
        onClick={() => {
          setZone(4);
        }}
      />
      <path
        d={`M${radius},${radius} L${
          radius * 2
        },${radius} A${radius},${radius} 0 0,1 ${radius},${radius * 2} Z`}
        fill={zone !== 3 ? "rgba(0,0,0,0.3)" : "#0056b3"}
        filter="url(#shadow)"
        onClick={() => {
          setZone(3);
        }}
      />
      <path
        d={`M${radius},${radius} L${radius},${
          radius * 2
        } A${radius},${radius} 0 0,1 ${radius - radius},${radius} Z`}
        fill={zone !== 2 ? "rgba(0,0,0,0.35)" : "#0056b3"}
        filter="url(#shadow)"
        onClick={() => {
          setZone(2);
        }}
      />
      <path
        d={`M${radius},${radius} L${
          radius - radius
        },${radius} A${radius},${radius} 0 0,1 ${radius},${radius - radius} Z`}
        fill={zone !== 1 ? "rgba(0,0,0,0.4)" : "#0056b3"}
        filter="url(#shadow)"
        onClick={() => {
          setZone(1);
        }}
      />
    </svg>
  );
}
