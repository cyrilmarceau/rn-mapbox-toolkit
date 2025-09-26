import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type HeatmapLayerProps = {
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
     * Defines the color of each pixel based on its density value in a heatmap.
     * Should be an expression that uses ["heatmap-density"] as input.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-heatmap-heatmap-color
     * @default ["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
     */
    'heatmap-color'?: Value<string>;

    /**
     * Similar to heatmap-weight but controls the intensity of the heatmap globally.
     * Primarily used for adjusting the heatmap based on zoom level.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-heatmap-heatmap-intensity
     * @default 1
     */
    'heatmap-intensity'?: Value<number>;

    /**
     * The global opacity at which the heatmap layer will be drawn.
     * Must be between 0 and 1 inclusive
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-heatmap-heatmap-opacity
     * @default 1
     */
    'heatmap-opacity'?: Value<number>;

    /**
     * Radius of influence of one heatmap point in pixels.
     * Increasing the value makes the heatmap smoother, but less detailed.
     * queryRenderedFeatures on heatmap layers will return points within this radius.
     * Must be greater than or equal to 1
     * Units in pixels
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-heatmap-heatmap-radius
     * @default 30
     */
    'heatmap-radius'?: Value<number>;

    /**
     * A measure of how much an individual point contributes to the heatmap.
     * A value of 10 would be equivalent to having 10 points of weight 1 in the same spot.
     * Especially useful when combined with clustering.
     * Must be greater than or equal to 0
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-heatmap-heatmap-weight
     * @default 1
     */
    'heatmap-weight'?: Value<number>;

    /**
     * Whether this layer is displayed.
     * "visible": The layer is shown.
     * "none": The layer is not shown.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-heatmap-visibility
     * @default "visible"
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
export type HeatmapLayerStyle = Pick<HeatmapLayerProps, 'layerStyle'>;
