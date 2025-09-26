import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type BackgroundLayerProps = {
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
     * Background of layer
     * Disabled by background-pattern
     * @default "#000000"
     */
    'background-color'?: Value<number>;

    /**
     * Controls the intensity of light emitted on the source features.
     */
    'background-emissive-strength'?: Value<number>;

    /**
     * The opacity at which the background will be drawn.
     */
    'background-opacity'?: Value<number>;

    /**
     * Orientation of background layer.
     * "map": The background is aligned to the plane of the map.
     * "viewport": The background is aligned to the plane of the viewport, covering the whole screen. Note: This mode disables the automatic reordering of the layer when terrain or globe projection is used.
     * @default map
     */
    'background-pitch-alignment'?: Value<'map' | 'viewport'>;
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
export type BackgroundLayerStyle = Pick<BackgroundLayerProps, 'layerStyle'>;
