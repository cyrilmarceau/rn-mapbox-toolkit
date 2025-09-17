import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type CircleLayerProps = {
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
     * Radius of the circle.
     * Supports Mapbox expressions.
     * @default 5
     */
    'circle-radius'?: Value<number>;

    /**
     * Fill color of the circle.
     * Supports Mapbox expressions.
     * @default '#000000'
     */
    'circle-color'?: Value<string>;

    /**
     * Controls the intensity of light emitted on the source features.
     */
    'circle-emissive-strength'?: Value<string>;

    /**
     * Opacity of the circle.
     * Supports Mapbox expressions.
     * @default 1
     */
    'circle-opacity'?: Value<number>;

    /**
     * Orientation of circle when map is pitched.
     * @default viewport
     */
    'circle-pitch-alignment'?: Value<'map' | 'viewport'>;

    /**
     * Controls the scaling behavior of the circle when the map is pitched.
     */
    'circle-pitch-scale'?: Value<'map' | 'viewport'>;
    /**
     * Width of the circle's stroke.
     * Supports Mapbox expressions.
     * @default 0
     */
    'circle-stroke-width'?: Value<number>;

    /**
     * Color of the circle's stroke.
     * Supports Mapbox expressions.
     * @default '#000000'
     */
    'circle-stroke-color'?: Value<string>;

    /**
     * Opacity of the circle's stroke.
     * Supports Mapbox expressions.
     * @default 1
     */
    'circle-stroke-opacity'?: Value<number>;

    /**
     * Blur distance applied to the circle.
     * Supports Mapbox expressions.
     * @default 0
     */
    'circle-blur'?: Value<number>;

    /**
     * Displacement of the circle relative to its original position.
     * Format: [x, y] in pixels.
     * Supports Mapbox expressions.
     * @default [0, 0]
     */
    'circle-translate'?: Value<[number, number]>;

    /**
     * Controls the frame of reference for circle-translate.
     * @default 'center'
     */
    'circle-translate-anchor'?: 'map' | 'viewport';

    /**
     * Rendering order for overlapping circles.
     * Supports Mapbox expressions.
     */
    'circle-sort-key'?: Value<number>;

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
 * @see https://docs.mapbox.com/style-spec/reference/layers/#circle
 */
export type CircleStyle = Pick<CircleLayerProps, 'layerStyle'>;
