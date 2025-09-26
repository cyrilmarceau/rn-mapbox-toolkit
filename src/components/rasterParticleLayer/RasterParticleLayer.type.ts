import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type RasterParticleLayerProps = {
  /**
   * The unique identifier for the layer.
   */
  layerID: string;
  /**
   * Data source identifier for the layer.
   */
  sourceID: string;

  /**
   * Minimum zoom level at which the layer is visible.
   * @default undefined (no minimum)
   */
  minZoom?: number;

  /**
   * Maximum zoom level at which the layer is visible.
   * @default undefined (no maximum)
   */
  maxZoom?: number;

  layerStyle?: {
    /** */
    'raster-particle-array-band': Value<string>;
    /**
     * Defines a color map by which to colorize a raster particle layer, parameterized by the ["raster-particle-speed"] expression and evaluated at 256 uniformly spaced steps over the range specified by raster-particle-max-speed.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-color
     */
    'raster-particle-color': Value<string>;
    /**
     * Defines the amount of particles per tile.
     * Must be greater than or equal to 1
     *
     * @default 512
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-count
     */
    'raster-particle-count': Value<number>;
    /**
     * Specifies an uniform elevation from the ground, in meters.
     * Must be greater than or equal to 0
     *
     * @default 0
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-elevation
     */
    'raster-particle-elevation': Value<number>;
    /**
     * Defines defines the opacity coefficient applied to the faded particles in each frame. In practice, this property controls the length of the particle tail.
     *
     * Must be between 0 and 1 inclusive
     * @default 0.98
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-fade-opacity-factor
     */
    'raster-particle-fade-opacity-factor': Value<number>;
    /**
     * Defines the maximum speed for particles. Velocities with magnitudes equal to or exceeding this value are clamped to the max value.
     *
     * Must be greater than or equal to 1
     * @default 1
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-max-speed
     */
    'raster-particle-max-speed': Value<number>;
    /**
     * Defines a coefficient for a time period at which particles will restart at a random position, to avoid degeneration (empty areas without particles).
     *
     * Must be between 0 and 1 inclusive
     * @default 0.8
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-reset-rate-factor
     */
    'raster-particle-reset-rate-factor': Value<number>;
    /**
     * Defines a coefficient for the speed of particles’ motion.
     *
     * Must be between 0 and 1 inclusive
     * @default 0.2
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-particle-raster-particle-speed-factor
     */
    'raster-particle-speed-factor': Value<number>;
    /**
     * Whether this layer is displayed.
     * "visible": The layer is shown.
     * "none": The layer is not shown.
     * @default "visible"
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-sky-visibility
     */
    'visibility'?: Value<'visible' | 'none'>;
  };

  /**
   * An expression specifying conditions on source features.
   * Only features that match the filter are displayed.
   * Zoom expressions in filters are only evaluated at integer zoom levels
   */
  filter?: Expression;

  /**
   * Event triggered when adding or updating a layer style *properties* fails.
   *
   * Note:
   * - If a style properties is add and fail but not typed in definitions files, this event will be trigger
   * - Currently, detailed error information may be limited.
   * @example 
   * 'Cannot set layer property: circle-radiuss error: circle layer doesn\'t support this property: circle-radiuss' => 'circle-radiuss': 5,
   * 'Cannot set layer property: circle-color error: value must be a valid color' => 'circle-color': '#fefe',
   
   */
  onLayerStyleError?: (e: OnLayerStyleError) => void;
};

/**
 * Type defining the style properties for a "circle" layer according to the Mapbox Style Specification.
 * @see https://docs.mapbox.com/style-spec/reference/layers/#background
 */
export type RasterParticleLayerStyle = Pick<
  RasterParticleLayerProps,
  'layerStyle'
>;
