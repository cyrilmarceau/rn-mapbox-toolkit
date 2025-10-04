export type RasterDemSourceProps = {
  /**
   * A URL to a TileJSON resource.
   *
   * Supported protocols are `"http:"`, `"https:"`, and `"mapbox://<Tileset ID>"`.
   *
   * Required if tiles is not provided.
   */
  url: string;

  /**
   * the ID of the source
   */
  sourceID: string;

  /**
   * Maximum zoom level for which tiles are available, as in the TileJSON spec.
   * Data from tiles at the maxzoom are used when displaying the map at higher zoom levels.
   *
   * @default 22.
   */
  maxzoom?: number;

  /**
   * Minimum zoom level for which tiles are available, as in the TileJSON spec.
   *
   * @default 0.
   */
  minzoom?: number;

  /**
   * The minimum visual size to display tiles for this layer.
   * Only configurable for raster layers.
   * @default 512.
   */
  tileSize?: number;

  children: React.ReactNode;
};
