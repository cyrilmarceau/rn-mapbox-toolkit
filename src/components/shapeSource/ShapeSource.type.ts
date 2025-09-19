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

  /**
   * Size of the tile buffer on each side.
   * A value of 0 produces no buffer.
   * A value of 512 produces a buffer as wide as the tile itself.
   * Larger values produce fewer rendering artifacts near tile edges and slower performance.
   *
   * `Value range: 0, 512`
   * @default 128
   */
  buffer?: number;

  /**
   * Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance).
   * @default 0.375
   */
  tolerance?: number;

  /**
   * If the data is a collection of point features, setting this to true clusters the points by radius into groups. 
   * Cluster groups become new Point features in the source with additional properties:
   * 
   * `cluster` Is true if the point is a cluster
    
  `cluster_id` A unqiue id for the cluster to be used in conjunction with the cluster inspection methods  
    
  `point_count` Number of original points grouped into this cluster
  
  `point_count_abbreviated` An abbreviated point count Default value: false.
    @default false
   */
  cluster?: boolean;

  /**
   * Radius of each cluster if clustering is enabled.
   * A value of `512` indicates a `radius equal to the width of a tile`.
   *
   * `Minimum value: 0`.
   * @default 50
   */
  clusterRadius?: number;

  /**
   * Max zoom on which to cluster points if clustering is enabled.
   * Defaults to one zoom less than maxzoom (so that last zoom features are not clustered).
   * Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom to 14 means the clusters will be displayed until z15.
   */
  clusterMaxZoom?: number;

  /**
   * Minimum number of points necessary to form a cluster if clustering is enabled
   * @default 2
   */
  clusterMinPoints?: number;
};
