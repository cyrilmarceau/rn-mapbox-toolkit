import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type HillshadeLayerProps = {
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
     * The shading color used to accentuate rugged terrain like sharp cliffs and gorges.
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-accent-color
     * @default "#000000"
     */
    'hillshade-accent-color'?: Value<string>;

    /**
     * Controls the intensity of light emitted on the source features.
     * Requires lights.
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-emissive-strength
     * @default 0
     */
    'hillshade-emissive-strength'?: Value<number>;

    /**
     * Intensity of the hillshade
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-exaggeration
     * @default 0.5
     */
    'hillshade-exaggeration'?: Value<number>;

    /**
     * The shading color of areas that faces towards the light source.
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-highlight-color
     * @default "#FFFFFF"
     */
    'hillshade-highlight-color'?: Value<string>;

    /**
     * Direction of light source when map is rotated.
     * - `"map"`: light direction is relative to north
     * - `"viewport"`: light direction is relative to the top of the viewport
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-illumination-anchor
     * @default "viewport"
     */
    'hillshade-illumination-anchor'?: Value<'map' | 'viewport'>;

    /**
     * The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to viewport and due north if `hillshade-illumination-anchor` is set to map and no 3d lights enabled.
     * If hillshade-illumination-anchor is set to map and 3d lights enabled, the direction from 3d lights is used instead.
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-illumination-direction
     * @default 335
     */
    'hillshade-illumination-direction'?: Value<number>;

    /**
     * Intensity of the hillshade
     * @see https://docs.mapbox.com/style-spec/reference/layers/#paint-hillshade-hillshade-shadow-color
     * @default "#000000"
     */
    'hillshade-shadow-color'?: Value<string>;

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
export type HeatmapStyleStyle = Pick<HillshadeLayerProps, 'layerStyle'>;
