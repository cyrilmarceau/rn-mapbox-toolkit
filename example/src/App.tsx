import MapView from 'rn-mapbox-toolkit';

export default function App() {
  return (
    <MapView
      style={{ flex: 1 }}
      styleUrl="streets-v12"
      showScaleBar={true}
      scaleBarOptions={{
        marginLeft: 200,
        isMetricUnits: true,
      }}
    />
  );
}
