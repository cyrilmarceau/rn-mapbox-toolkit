import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type RasterLayerProps = {
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
    /**
     * Increase or reduce the brightness of the image. The value is the maximum brightness.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-brightness-max
     * @default 1
     */
    'raster-brightness-max'?: Value<number>;

    /**
     * Increase or reduce the brightness of the image. The value is the minimum brightness.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-brightness-min
     * @default 0
     */
    'raster-brightness-min'?: Value<number>;

    /**
     * Defines a color map by which to colorize a raster layer, parameterized by the ["raster-value"] expression and evaluated at 256 uniformly spaced steps over the range specified by raster-color-range.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-color
     */
    'raster-color'?: Value<string>;

    /**
     * When raster-color is active, specifies the combination of source RGB channels used to compute the raster value.
     * Computed using the equation mix.r * src.r + mix.g * src.g + mix.b * src.b + mix.a.
     * The first three components specify the mix of source red, green, and blue channels, respectively.
     * The fourth component serves as a constant offset and is not multipled by source alpha.
     * Source alpha is instead carried through and applied as opacity to the colorized result.
     * Default value corresponds to RGB luminosity.
     *
     * Requires `raster-color`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-color-mix
     * @default [0.2126,0.7152,0.0722,0]
     */
    'raster-color-mix'?: Value<number>;

    /**
     * When `raster-color` is active, specifies the range over which `raster-color` is tabulated.
     * Units correspond to the computed raster value via `raster-color-mix`.
     * For rasterarray sources, if `raster-color-range` is unspecified, the source's stated data range is used.
     *
     * Requires `raster-color`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-color-range
     */
    'raster-color-range'?: Value<[number, number]>;

    /**
     * Increase or reduce the contrast of the image.
     * Must be between -1 and 1.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-contrast
     * @default 0
     */
    'raster-contrast'?: Value<number>;

    /**
     * Specifies an uniform elevation from the ground, in meters.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-elevation
     * @default 0
     * @experimental
     */
    'raster-elevation'?: Value<number>;

    /**
     * Controls the intensity of light emitted on the source features.
     *
     * Requires `lights`
     * Units in `intensity`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-emissive-strength
     * @default 0
     */
    'raster-emissive-strength'?: Value<number>;

    /**
     * Optional. Duration in milliseconds for fading in new tiles.
     *
     * Units in `milliseconds`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-fade-duration
     * @default 300
     */
    'raster-fade-duration'?: Value<number>;

    /**
     * Rotates hues around the color wheel.
     *
     * Units in `degrees`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-hue-rotate
     * @default 0
     */
    'raster-hue-rotate'?: Value<number>;

    /**
     * The opacity at which the image will be drawn.
     * Must be between 0 and 1 inclusive.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-opacity
     * @default 1
     */
    'raster-opacity'?: Value<number>;

    /**
     * The resampling/interpolation method to use for overscaling, also known as texture magnification filter
     * linear: (Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled
     * nearest: Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-resampling
     * @default "linear"
     */
    'raster-resampling'?: Value<'linear' | 'nearest'>;

    /**
     * Increase or reduce the saturation of the image.
     * Must be between 0 and 1 inclusive.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-raster-raster-saturation
     * @default 0
     */
    'raster-saturation'?: Value<number>;
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
export type RasterLayerStyle = Pick<RasterLayerProps, 'layerStyle'>;
