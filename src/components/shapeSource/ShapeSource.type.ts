export type ShapeSourceProps = {
  /**
   * Inline GeoJSON.
   * If [shape] is invalid - `onMapLoadingError` with `type = source` will be invoked.
   */
  shape: GeoJSON.FeatureCollection | GeoJSON.Feature;
  /**
   * the ID of the source
   */
  sourceID: string;
};
