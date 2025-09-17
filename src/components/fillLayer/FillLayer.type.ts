import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type FillLayerProps = {
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

  /**
   * An expression specifying conditions on source features.
   * Only features that match the filter are displayed.
   * Zoom expressions in filters are only evaluated at integer zoom levels
   */
  filter?: Expression;

  layerStyle?: {
    /**
     * Whether or not the fill should be antialiased.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-antialias
     * @default true
     */
    'fill-antialias'?: Value<boolean>;

    /**
     * The color of the filled part of this layer.
     * This color can be specified as rgba with an alpha component and the color's opacity will not affect the opacity of the 1px stroke,
     * if it is used.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-color
     * @default "#000000"
     */
    'fill-color'?: Value<string>;

    /**
     * Controls the intensity of light emitted on the source features.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-emissive-strength
     * @default 0
     */
    'fill-emissive-strength'?: Value<number>;

    /**
     * The opacity of the entire fill layer. In contrast to the fill-color,
     * this value will also affect the 1px stroke around the fill, if the stroke is used.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-opacity
     * @default 1
     * @range 0-1 (inclusive) // Check how I can create range for ts doc
     */
    'fill-opacity'?: Value<number>;

    /**
     * The outline color of the fill. Matches the value of `fill-color` if unspecified.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-outline-color
     * @note Disabled by `fill-pattern`. Requires `fill-antialias` to be true.
     */
    'fill-outline-color'?: Value<string>;

    /**
     * Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512).
     *  @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-pattern
     * @note Zoom-dependent expressions will be evaluated only at integer zoom levels.
     */
    'fill-pattern'?: Value<string>;

    /**
     * Controls the transition progress between the image variants of fill-pattern.
     * Zero means the first variant is used, one is the second, and in between they are blended together.
     * Both images should be the same size and have the same type (either raster or vector).
     *  @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-pattern-cross-fade
     * @default 0
     * @range 0-1 (inclusive) // Check how I can create range for ts doc
     */
    'fill-pattern-cross-fade'?: Value<number>;

    /**
     * Sorts features in ascending order based on this value.
     * Features with a higher sort key will appear above features with a lower sort key.
     *  @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-pattern-sort-key
     */
    'fill-sort-key'?: Value<number>;

    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-translate
     */
    'fill-translate'?: Value<[number, number]>;

    /**
     * Controls the frame of reference for fill-translate.
     *  @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-fill-translate-anchor
     * @default "map"
     */
    'fill-translate-anchor'?: Value<'map' | 'viewport'>;

    /**
     * The visibility of the layer.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-fill-visibility
     * @default "visible"
     */
    'visibility'?: Value<'visible' | 'none'>;
  };

  /**
   * Event triggered when adding or updating a layer style property fails.
   *
   * @remarks
   * - Triggered if a style property is added and fails but not properly typed in definition files
   * - Currently, detailed error information may be limited
   *
   * @example
   * ```typescript
   * // Invalid property name
   * 'Cannot set layer property: circle-radiuss error: circle layer doesn\'t support this property: circle-radiuss'
   * // Caused by: 'circle-radiuss': 5
   *
   * // Invalid color value
   * 'Cannot set layer property: circle-color error: value must be a valid color'
   * // Caused by: 'circle-color': '#fefe'
   * ```
   */
  onLayerStyleError?: (error: OnLayerStyleError) => void;
};

/**
 * Type defining the style properties for a "fill" layer according to the Mapbox Style Specification.
 * @see https://docs.mapbox.com/style-spec/reference/layers/#fill
 */
export type FillLayerStyle = Pick<FillLayerProps, 'layerStyle'>;
